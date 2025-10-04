import React, { useState } from 'react';
import { X } from 'lucide-react';

const CoinFlip: React.FC = () => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState<'heads' | 'tails' | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentRotation, setCurrentRotation] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const fetchDogImage = async (): Promise<string> => {
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      if (!response.ok) throw new Error('Failed to fetch dog image');
      const data = await response.json();
      return data.message;
    } catch (err) {
      throw new Error('Failed to fetch dog image. Please try again.');
    }
  };

  const fetchCatImage = async (): Promise<string> => {
    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search');
      if (!response.ok) throw new Error('Failed to fetch cat image');
      const data = await response.json();
      return data[0].url;
    } catch (err) {
      throw new Error('Failed to fetch cat image. Please try again.');
    }
  };

  const handleFlip = async () => {
    if (isFlipping || loading) return;
    
    // Step 1: Start flipping - hide previous result and image
    setIsFlipping(true);
    setShowResult(false);
    setImageUrl(null);
    setError(null);
    
    // Determine the flip result FIRST
    const flipResult: 'heads' | 'tails' = Math.random() < 0.5 ? 'heads' : 'tails';
    
    // Calculate the new rotation based on the result
    // We need to ensure the coin lands exactly on the correct side
    const spins = 5;
    
    // Calculate where we need to land: heads = even multiple of 360, tails = odd multiple of 180
    let targetRotation;
    if (flipResult === 'heads') {
      // Land on heads (0°, 360°, 720°, etc.) - we want a multiple of 360
      targetRotation = currentRotation + (spins * 360);
      // Normalize to ensure it's exactly 0° position (heads facing front)
      targetRotation = Math.ceil(targetRotation / 360) * 360;
    } else {
      // Land on tails (180°, 540°, 900°, etc.) - we want an odd multiple of 180
      targetRotation = currentRotation + (spins * 360) + 180;
      // Normalize to ensure it's exactly 180° position (tails facing front)
      const normalized = Math.ceil((targetRotation - 180) / 360) * 360 + 180;
      targetRotation = normalized;
    }
    
    setCurrentRotation(targetRotation);
    
    // Step 2: Wait for coin animation to complete (1.5 seconds)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Step 3: NOW set the result (after animation is done)
    setResult(flipResult);
    setShowResult(true);
    setIsFlipping(false);
    
    // Step 4: Wait a tiny bit, then start fetching the image
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Step 5: Fetch the image based on the SAME result
    setLoading(true);
    try {
      const url = flipResult === 'heads' 
        ? await fetchDogImage() 
        : await fetchCatImage();
      setImageUrl(url);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setImageUrl(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-white text-center mb-8 sm:mb-12 drop-shadow-lg">
          🎲 Coin Flip Pet Picker 🐾
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
          {/* Left Side - Image Container */}
          <div className="bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-6 sm:p-8 min-h-[500px] flex flex-col">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              Your Random Pet
            </h2>
            
            <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 border-4 border-dashed border-gray-300">
              {loading ? (
                <div className="text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
                  <p className="text-gray-600 font-medium">Loading your pet...</p>
                </div>
              ) : error ? (
                <div className="text-center text-red-500 p-4">
                  <X className="w-16 h-16 mx-auto mb-2" />
                  <p className="font-semibold">{error}</p>
                  <button 
                    onClick={handleFlip}
                    className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Try Again
                  </button>
                </div>
              ) : imageUrl ? (
                <div className="w-full h-full flex flex-col items-center justify-center animate-fadeIn">
                  <img 
                    src={imageUrl} 
                    alt={result === 'heads' ? 'Random dog' : 'Random cat'}
                    className="max-w-full max-h-[400px] rounded-xl shadow-lg object-contain"
                    onError={() => setError('Failed to load image')}
                  />
                  <p className="mt-4 text-2xl font-bold text-gray-700">
                    {result === 'heads' ? '🐕 Woof! Woof!' : '🐱 Meow! Meow!'}
                  </p>
                </div>
              ) : (
                <div className="text-center text-gray-400">
                  <p className="text-6xl mb-4">🎲</p>
                  <p className="text-xl font-medium">
                    {isFlipping ? 'Flipping the coin...' : 'Flip the coin to see a pet!'}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Coin Flip Controls */}
          <div className="bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-6 sm:p-8 flex flex-col items-center justify-center min-h-[500px] space-y-8">
            {/* Coin Animation */}
            <div className="relative h-40 flex items-center justify-center perspective-1000">
              <div 
                className="coin-container"
                style={{
                  transform: `rotateY(${currentRotation}deg)`,
                  transition: isFlipping ? 'transform 1.5s ease-in-out' : 'none'
                }}
              >
                {/* Heads Side */}
                <div className="coin-face coin-heads">
                  <div className="text-4xl font-bold">🐕</div>
                  <div className="text-sm font-semibold mt-1">HEADS</div>
                </div>
                {/* Tails Side */}
                <div className="coin-face coin-tails">
                  <div className="text-4xl font-bold">🐱</div>
                  <div className="text-sm font-semibold mt-1">TAILS</div>
                </div>
              </div>
            </div>

            {/* Result Display */}
            <div className={`bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl shadow-lg min-w-[250px] text-center transition-all duration-300 ${
              showResult ? 'opacity-100 scale-100' : 'opacity-50 scale-95'
            }`}>
              <p className="text-sm font-medium mb-1 opacity-90">Result</p>
              <p className="text-2xl sm:text-3xl font-bold">
                {isFlipping && '🎲 Flipping...'}
                {!isFlipping && showResult && result === 'heads' && '🐕 Heads (Dog)'}
                {!isFlipping && showResult && result === 'tails' && '🐱 Tails (Cat)'}
                {!isFlipping && !showResult && 'Ready to flip!'}
              </p>
            </div>

            {/* Flip Button */}
            <button
              onClick={handleFlip}
              disabled={isFlipping || loading}
              className={`px-12 py-4 text-xl font-bold rounded-full shadow-lg transform transition-all duration-200 ${
                isFlipping || loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 hover:scale-105 active:scale-95 text-white'
              }`}
            >
              {isFlipping ? '🎲 Flipping...' : loading ? '⏳ Loading...' : '🎲 Flip Coin'}
            </button>

            {/* Info */}
            <div className="text-center text-gray-600 text-sm mt-4 bg-blue-50 p-4 rounded-xl">
              <p className="font-semibold mb-1">🎮 How it works:</p>
              <p>Heads = Random Dog 🐕</p>
              <p>Tails = Random Cat 🐱</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinFlip;
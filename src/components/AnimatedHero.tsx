
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const AnimatedHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lastImageRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVerticalScrolling, setIsVerticalScrolling] = useState(false);

  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0.3, 0.7], [1, 1.5]);
  const textScale = useTransform(scrollYProgress, [0.3, 0.7], [1, 1.3]);

  const heroImages = [
    '/lovable-uploads/b68cfdb1-6cf2-4fed-ae5d-440517687857.png',
    '/lovable-uploads/9d51a39b-d5c5-404e-a135-356b6d63ed7c.png',
    '/lovable-uploads/6b4b9caa-abc7-4569-b88f-fe10c6eb2d1d.png'
  ];

  useEffect(() => {
    if (!containerRef.current || !imageContainerRef.current) return;

    const container = containerRef.current;
    const imageContainer = imageContainerRef.current;
    let horizontalScrollTween: gsap.core.Tween;

    // Horizontal scrolling animation
    const setupHorizontalScroll = () => {
      const totalWidth = heroImages.length * window.innerWidth;
      
      horizontalScrollTween = gsap.to(imageContainer, {
        x: -(totalWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: `+=${totalWidth}`,
          scrub: 1,
          pin: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const newIndex = Math.floor(progress * heroImages.length);
            setCurrentImageIndex(Math.min(newIndex, heroImages.length - 1));
            
            // Switch to vertical scrolling when last image is fully visible
            if (progress >= 0.8 && !isVerticalScrolling) {
              setIsVerticalScrolling(true);
            }
          }
        }
      });
    };

    // Zoom effect for the last image
    const setupZoomEffect = () => {
      if (lastImageRef.current) {
        gsap.fromTo(lastImageRef.current, 
          { scale: 1 },
          {
            scale: 1.2,
            ease: "none",
            scrollTrigger: {
              trigger: lastImageRef.current,
              start: "top center",
              end: "bottom center",
              scrub: 1
            }
          }
        );
      }
    };

    setupHorizontalScroll();
    setupZoomEffect();

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [heroImages.length, isVerticalScrolling]);

  return (
    <>
      {/* Horizontal Scrolling Hero Section */}
      <div ref={containerRef} className="relative h-screen overflow-hidden">
        <div 
          ref={imageContainerRef}
          className="flex h-full"
          style={{ width: `${heroImages.length * 100}vw` }}
        >
          {heroImages.map((image, index) => (
            <div
              key={index}
              ref={index === heroImages.length - 1 ? lastImageRef : null}
              className="relative w-screen h-full flex-shrink-0"
            >
              <motion.div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `linear-gradient(rgba(139, 0, 0, 0.4), rgba(184, 134, 11, 0.4)), url('${image}')`
                }}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
              
              {/* Floating particles effect */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-30"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [-20, 20],
                      opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Text overlay that scales with scroll */}
        <motion.div
          ref={textRef}
          className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
          style={{ scale: isVerticalScrolling ? textScale : 1 }}
        >
          <div className="text-center text-white max-w-4xl mx-auto px-4 pointer-events-auto">
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              DDR Kunstgalerie
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl mb-8 text-yellow-200"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              Authentische Gemälde aus der Zeit der Deutschen Demokratischen Republik
            </motion.p>
            
            <motion.p
              className="text-lg mb-10 text-gray-200 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.1 }}
            >
              Entdecken Sie eine einzigartige Sammlung von Originalgemälden, die das Leben, 
              die Kultur und die Hoffnungen einer ganzen Generation widerspiegeln.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.4 }}
            >
              <Link 
                to="/galerie"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-red-800 px-8 py-4 rounded-lg text-lg font-bold hover:from-yellow-400 hover:to-yellow-300 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <span>Galerie entdecken</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              
              <Link 
                to="/ueber-uns"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-lg text-lg font-bold hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <span>Künstlerin entdecken</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Progress indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex space-x-2">
            {heroImages.map((_, index) => (
              <motion.div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentImageIndex ? 'bg-yellow-400' : 'bg-white opacity-50'
                }`}
                animate={{
                  scale: index === currentImageIndex ? 1.2 : 1,
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 right-8 z-20"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-white rounded-full mt-2"
              animate={{
                opacity: [1, 0.3, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Spacer for zoom effect */}
      {isVerticalScrolling && (
        <div className="h-screen bg-gradient-to-b from-red-900 to-yellow-900" />
      )}
    </>
  );
};

export default AnimatedHero;

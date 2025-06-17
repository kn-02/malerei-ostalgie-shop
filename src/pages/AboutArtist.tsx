
import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowRight, Play, Pause, Volume2 } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const AboutArtist = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0.3]);

  const timelineEvents = [
    { year: '1948', event: 'Geboren in Dresden', side: 'left', type: 'personal' },
    { year: '1949', event: 'Gründung der DDR', side: 'right', type: 'historical' },
    { year: '1968', event: 'Studium an der Kunsthochschule', side: 'left', type: 'personal' },
    { year: '1968', event: 'Prager Frühling', side: 'right', type: 'historical' },
    { year: '1975', event: 'Erste Einzelausstellung', side: 'left', type: 'personal' },
    { year: '1976', event: 'Biermann-Ausbürgerung', side: 'right', type: 'historical' },
    { year: '1983', event: 'Konflikt mit der Stasi', side: 'left', type: 'personal' },
    { year: '1987', event: 'Internationale Anerkennung', side: 'left', type: 'personal' },
    { year: '1989', event: 'Fall der Berliner Mauer', side: 'right', type: 'historical' },
    { year: '1992', event: 'Retrospektive im Museum', side: 'left', type: 'personal' }
  ];

  const quotes = [
    {
      text: "Kunst war mein stiller Widerstand gegen die Gleichschaltung der Seelen.",
      context: "Über ihre Arbeit in der DDR"
    },
    {
      text: "Jeder Pinselstrich war ein Akt der Freiheit in einer unfreien Zeit.",
      context: "Interview 1995"
    },
    {
      text: "Die Zensur lehrte mich, in Metaphern zu sprechen und Wahrheiten zu verstecken.",
      context: "Künstlerisches Testament"
    }
  ];

  const studioImages = [
    '/lovable-uploads/b68cfdb1-6cf2-4fed-ae5d-440517687857.png',
    '/lovable-uploads/9d51a39b-d5c5-404e-a135-356b6d63ed7c.png',
    '/lovable-uploads/6b4b9caa-abc7-4569-b88f-fe10c6eb2d1d.png'
  ];

  useEffect(() => {
    if (!timelineRef.current) return;

    const timelineItems = gsap.utils.toArray('.timeline-item');
    
    timelineItems.forEach((item: any, index) => {
      gsap.fromTo(item, 
        { 
          opacity: 0, 
          x: item.classList.contains('timeline-left') ? -100 : 100 
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }, []);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsAudioPlaying(!isAudioPlaying);
    }
  };

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(quoteInterval);
  }, [quotes.length]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section with Portrait */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 mt-16">
        <motion.div 
          className="absolute inset-0 opacity-10"
          style={{ 
            scale: heroScale,
            opacity: heroOpacity,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Cpath d='M30 30l30-30H30zM0 30l30 30v-30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
        
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Portrait */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-transparent rounded-lg" />
              <img 
                src="/lovable-uploads/b68cfdb1-6cf2-4fed-ae5d-440517687857.png"
                alt="Künstlerin Portrait"
                className="w-full max-w-md mx-auto rounded-lg shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 filter contrast-110 brightness-95"
              />
              
              {/* Quote Overlay */}
              <motion.div
                className="absolute bottom-6 left-6 right-6 bg-black/80 text-white p-4 rounded backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <p className="font-mono text-sm italic">
                  "Kunst ist der einzige Ort, wo die Wahrheit lebt."
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Introduction Text */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 font-mono leading-tight">
              Eine Stimme
              <span className="block text-red-800">des Widerstands</span>
            </h1>
            
            <div className="space-y-4 text-lg text-gray-700 leading-relaxed font-mono">
              <p>
                Geboren in den Trümmern des Krieges, aufgewachsen im Schatten der Mauer. 
                Ihre Kunst war Zeugnis und Widerstand zugleich.
              </p>
              <p>
                Vier Jahrzehnte lang malte sie das Leben in der DDR – 
                nicht wie es sein sollte, sondern wie es war.
              </p>
              <p className="text-red-800 font-bold">
                Dies ist ihre Geschichte.
              </p>
            </div>

            <motion.div
              className="pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              <Link 
                to="/werke"
                className="inline-flex items-center space-x-2 bg-red-800 text-white px-6 py-3 rounded font-mono font-bold hover:bg-red-900 transition-colors"
              >
                <span>Werke entdecken</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section ref={timelineRef} className="py-20 bg-white relative">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold text-center text-gray-900 mb-16 font-mono"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Leben zwischen den Zeiten
          </motion.h2>

          <div className="relative max-w-6xl mx-auto">
            {/* Central Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-0.5 top-0 bottom-0 w-1 bg-gradient-to-b from-red-800 via-gray-400 to-red-800" />

            {timelineEvents.map((event, index) => (
              <div
                key={index}
                className={`timeline-item relative grid grid-cols-2 gap-8 mb-12 ${
                  event.side === 'left' ? 'timeline-left' : 'timeline-right'
                }`}
              >
                {event.side === 'left' ? (
                  <>
                    {/* Personal Event - Left Side */}
                    <div className="text-right pr-8">
                      <div className={`inline-block p-4 rounded-lg shadow-lg ${
                        event.type === 'personal' 
                          ? 'bg-red-50 border-l-4 border-red-800' 
                          : 'bg-gray-50 border-l-4 border-gray-600'
                      }`}>
                        <div className="text-2xl font-bold font-mono text-red-800 mb-2">
                          {event.year}
                        </div>
                        <div className="text-gray-800 font-mono">
                          {event.event}
                        </div>
                      </div>
                    </div>
                    <div /> {/* Empty right column */}
                  </>
                ) : (
                  <>
                    <div /> {/* Empty left column */}
                    {/* Historical Event - Right Side */}
                    <div className="pl-8">
                      <div className={`inline-block p-4 rounded-lg shadow-lg ${
                        event.type === 'historical'
                          ? 'bg-gray-50 border-l-4 border-gray-600'
                          : 'bg-red-50 border-l-4 border-red-800'
                      }`}>
                        <div className="text-2xl font-bold font-mono text-gray-700 mb-2">
                          {event.year}
                        </div>
                        <div className="text-gray-800 font-mono">
                          {event.event}
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-800 rounded-full border-4 border-white shadow-lg" 
                     style={{ top: '1rem' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Studio & Process Gallery */}
      <section className="py-20 bg-gradient-to-b from-gray-100 to-gray-200 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold text-center text-gray-900 mb-16 font-mono"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Im Atelier der Erinnerung
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {studioImages.map((image, index) => (
              <motion.div
                key={index}
                className="relative group overflow-hidden rounded-lg shadow-xl"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div 
                  className="h-80 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="font-mono text-sm">
                    {index === 0 && "Atelier in Ost-Berlin, 1985"}
                    {index === 1 && "Arbeit an einer Landschaftsserie"}
                    {index === 2 && "Heimliche Ausstellung, 1987"}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Audio Memory Block */}
      <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20l20-20H20zM0 20l20 20v-20z'/%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-8 font-mono text-red-400">
              Stimmen der Vergangenheit
            </h2>
            
            <p className="text-xl mb-12 text-gray-300 font-mono">
              Ein seltenes Zeugnis: Interview von 1994 über ihr Leben und Schaffen
            </p>

            <div className="bg-black/50 rounded-lg p-8 backdrop-blur-sm border border-red-800/30">
              <div className="flex items-center justify-center space-x-6 mb-6">
                <button
                  onClick={toggleAudio}
                  className="w-16 h-16 rounded-full bg-red-800 hover:bg-red-700 transition-colors flex items-center justify-center"
                >
                  {isAudioPlaying ? (
                    <Pause className="h-8 w-8 text-white" />
                  ) : (
                    <Play className="h-8 w-8 text-white ml-1" />
                  )}
                </button>
                
                <div className="flex items-center space-x-2">
                  <Volume2 className="h-5 w-5 text-red-400" />
                  <div className="flex space-x-1">
                    {[...Array(20)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1 bg-red-400 rounded-full"
                        style={{ height: Math.random() * 40 + 10 }}
                        animate={{
                          scaleY: isAudioPlaying ? [1, 0.5, 1] : 1,
                        }}
                        transition={{
                          duration: 0.5,
                          repeat: isAudioPlaying ? Infinity : 0,
                          delay: i * 0.1,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <audio ref={audioRef} className="hidden">
                {/* Placeholder for audio file */}
              </audio>

              <div className="text-left text-gray-300 font-mono text-sm italic">
                <p className="mb-2">
                  "Es war nicht einfach, als Künstlerin in der DDR zu arbeiten. 
                  Man musste zwischen den Zeilen malen, verstehen Sie?"
                </p>
                <p className="text-red-400 text-xs">
                  — Aufnahme vom 15. März 1994, Berlin
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quote Wall */}
      <section className="py-20 bg-gradient-to-b from-gray-800 to-black text-white relative">
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url('/lovable-uploads/b68cfdb1-6cf2-4fed-ae5d-440517687857.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(3px)'
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.h2
            className="text-4xl font-bold text-center mb-16 font-mono text-red-400"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Worte des Widerstands
          </motion.h2>

          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuote}
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 1 }}
              >
                <blockquote className="text-3xl lg:text-4xl font-mono italic leading-relaxed mb-8 text-gray-100">
                  "{quotes[currentQuote].text}"
                </blockquote>
                <cite className="text-red-400 font-mono text-lg">
                  — {quotes[currentQuote].context}
                </cite>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center mt-12 space-x-2">
              {quotes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuote(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentQuote === index ? 'bg-red-400' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>

          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <Link 
              to="/werke"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-700 to-red-800 text-white px-8 py-4 rounded-lg font-mono font-bold hover:from-red-800 hover:to-red-900 transition-all duration-300 transform hover:scale-105"
            >
              <span>Ihre Werke erleben</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutArtist;

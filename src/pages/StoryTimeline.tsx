
import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TimelineItem from '../components/timeline/TimelineItem';
import AudioPlayer from '../components/timeline/AudioPlayer';
import { timelineData } from '../data/timelineData';
import { Play, Pause, Volume2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const StoryTimeline = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);

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
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            onEnter: () => setActiveSection(index),
          }
        }
      );
    });

    // Anchor moments with special effects
    const anchorMoments = gsap.utils.toArray('.anchor-moment');
    anchorMoments.forEach((moment: any) => {
      gsap.timeline({
        scrollTrigger: {
          trigger: moment,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        }
      })
      .to(moment.querySelector('.anchor-bg'), {
        scale: 1.1,
        opacity: 0.8,
        duration: 2
      })
      .to(moment.querySelector('.anchor-text'), {
        opacity: 1,
        y: 0,
        duration: 1.5
      }, "-=1");
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 text-gray-800">
      <Header />
      
      {/* Intro Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('/lovable-uploads/b68cfdb1-6cf2-4fed-ae5d-440517687857.png')`,
            scale: heroScale,
            opacity: heroOpacity
          }}
        />
        <div className="absolute inset-0 bg-white/40" />
        
        <motion.div
          className="relative z-10 text-center max-w-4xl mx-auto px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <motion.h1
            className="text-6xl lg:text-8xl font-bold mb-8 font-mono text-blue-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          >
            ZEITZEUGIN
          </motion.h1>
          
          <motion.blockquote
            className="text-2xl lg:text-4xl italic mb-12 text-gray-700 font-serif leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 1 }}
          >
            "Ich zeichnete, wo Sprache verboten war."
          </motion.blockquote>
          
          <motion.p
            className="text-lg text-gray-600 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1.5 }}
          >
            Eine Künstlerin zwischen Widerstand und Überwachung
            <br />
            1948 – 1989
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-blue-400 to-transparent" />
        </motion.div>
      </section>

      {/* Timeline Section */}
      <section ref={timelineRef} className="relative py-20 bg-gradient-to-b from-white via-blue-50 to-white">
        <div className="container mx-auto px-4 relative z-10">
          <motion.h2
            className="text-4xl font-bold text-center mb-16 font-mono text-blue-600"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Chronik des Widerstands
          </motion.h2>

          {/* Central Timeline Line */}
          <div className="relative max-w-6xl mx-auto">
            <div className="absolute left-1/2 transform -translate-x-0.5 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-gray-400 to-blue-500" />

            {timelineData.map((item, index) => (
              <TimelineItem 
                key={index} 
                item={item} 
                index={index}
                isActive={activeSection === index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Anchor Moment: Stasi Interrogation */}
      <section className="anchor-moment relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-r from-blue-50 to-white">
        <div 
          className="anchor-bg absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url('/lovable-uploads/9d51a39b-d5c5-404e-a135-356b6d63ed7c.png')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-transparent to-white/50" />
        
        <motion.div
          className="anchor-text relative z-10 max-w-4xl mx-auto text-center px-4 opacity-0 transform translate-y-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-5xl lg:text-7xl font-bold mb-8 font-mono text-blue-600">
            1983
          </h3>
          <h4 className="text-3xl lg:text-4xl mb-8 text-gray-700 font-serif italic">
            Das Verhör
          </h4>
          <p className="text-xl text-gray-600 leading-relaxed font-mono max-w-3xl mx-auto">
            "Sie fragten nach jedem Pinselstrich, nach jeder Farbe. 
            Als ob sie meine Seele sezieren wollten. Aber sie verstanden nicht, 
            dass Kunst keine Sprache ist, die man übersetzen kann."
          </p>
          
          <div className="mt-12">
            <AudioPlayer 
              title="Tagebucheintrag, 15. März 1983"
              isPlaying={isAudioPlaying}
              onToggle={toggleAudio}
            />
          </div>
        </motion.div>
      </section>

      {/* Final Section: "Und danach?" */}
      <section className="relative py-32 bg-gradient-to-b from-white to-blue-50 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{ 
            backgroundImage: `url('/lovable-uploads/6b4b9caa-abc7-4569-b88f-fe10c6eb2d1d.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl lg:text-6xl font-bold mb-12 font-mono text-blue-600">
              Und danach?
            </h2>
            
            <div className="space-y-8 text-xl text-gray-700 leading-relaxed font-serif">
              <p>
                Als die Mauer fiel, fiel auch ein Teil ihrer Identität. 
                Der Widerstand, der ihre Kunst genährt hatte, war plötzlich überflüssig.
              </p>
              <p>
                In der neuen Freiheit suchte sie nach einer neuen Sprache. 
                Die Farben wurden heller, die Formen weicher.
              </p>
              <p className="text-2xl text-blue-600 font-bold">
                Aber die Erinnerung blieb. In jedem Werk.
              </p>
            </div>

            <motion.div
              className="mt-16 p-8 bg-white/80 rounded-lg backdrop-blur-sm border border-blue-200"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <blockquote className="text-2xl italic text-gray-700 mb-4">
                "Kunst ist das Gedächtnis der Menschheit. 
                Meine Werke sind Zeugen einer Zeit, die nie vergessen werden darf."
              </blockquote>
              <cite className="text-blue-600 font-mono">
                — Letztes Interview, 1995
              </cite>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
      
      {/* Hidden audio element */}
      <audio ref={audioRef} className="hidden">
        {/* Placeholder for audio file */}
      </audio>
    </div>
  );
};

export default StoryTimeline;

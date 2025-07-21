'use client';

import { useState, useEffect } from 'react';
import { families } from '@/data/families';
import FamilySidebar from '@/components/family-sidebar';
import FamilyTimeline from '@/components/family-timeline';
import BiographyNarrative from '@/components/biography-narrative';
import ImageGallery from '@/components/image-gallery';
import ResearchArticles from '@/components/research-articles';

export default function Home() {
  const [selectedFamily, setSelectedFamily] = useState(families[0].id);
  const [isLoading, setIsLoading] = useState(false);
  const [opacity, setOpacity] = useState(1);

  const currentFamily = families.find(f => f.id === selectedFamily) || families[0];

  useEffect(() => {
    if (selectedFamily !== families[0].id) {
      setIsLoading(true);
      setOpacity(0.3);
      
      // Simulate loading with papery scroll effect
      setTimeout(() => {
        setOpacity(1);
        setIsLoading(false);
      }, 300);
    }
  }, [selectedFamily]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-stone-100"
      style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23f5f5f5\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
      }}
    >
      <FamilySidebar
        selectedFamily={selectedFamily}
        onFamilySelect={setSelectedFamily}
      />

      <main className="ml-64 transition-opacity duration-300" style={{ opacity }}>
        <div className="min-h-screen py-8 px-8">
          <header className="text-center mb-12 pt-8"
            style={{
              background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.1), rgba(47, 79, 79, 0.1))',
              borderRadius: '1rem',
              padding: '2rem',
              marginBottom: '2rem'
            }}
          >
            <div className="mb-4">
              <span className="text-4xl mr-4">{currentFamily.emblem}</span>
            </div>
            <h1 className="text-4xl font-bold text-stone-800 mb-4 font-serif"
              style={{ color: currentFamily.color }}
            >
              {currentFamily.name}家族史馆
            </h1>
            <p className="text-xl text-stone-600 leading-relaxed max-w-3xl mx-auto"
              style={{ fontFamily: 'KaiTi, serif' }}
            >
              {currentFamily.description}
            </p>
          </header>

          {isLoading ? (
            <div className="flex items-center justify-center h-96"
            >
              <div className="text-center"
                style={{
                  background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Cpath fill=\'%23f5f5f5\' d=\'M10,50 Q30,10 50,50 T90,50 L90,90 L10,90 Z\'/%3E%3C/svg%3E") center no-repeat',
                  backgroundSize: '200px 200px',
                  width: '200px',
                  height: '200px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div className="text-stone-600"
                  style={{ marginTop: '120px', fontFamily: 'KaiTi, serif' }}
                >
                  宣纸展开中...
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-12">
              <section id="biography">
                <BiographyNarrative
                  biography={currentFamily.biography}
                  familyColor={currentFamily.color}
                  familyName={currentFamily.name}
                />
              </section>

              <section id="timeline">
                <FamilyTimeline
                  members={currentFamily.members}
                  familyColor={currentFamily.color}
                />
              </section>

              <section id="gallery">
                <ImageGallery
                  gallery={currentFamily.gallery}
                  familyColor={currentFamily.color}
                />
              </section>

              <section id="articles">
                <ResearchArticles
                  articles={currentFamily.articles}
                  familyColor={currentFamily.color}
                />
              </section>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Impressum = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="bg-gradient-to-r from-red-800 via-red-700 to-yellow-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Impressum</h1>
          <p className="text-xl text-yellow-200">Rechtliche Informationen</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Angaben gemäß § 5 TMG</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Betreiber</h3>
                <p className="text-gray-700">
                  DDR Kunstgalerie GmbH<br />
                  Musterstraße 123<br />
                  10117 Berlin<br />
                  Deutschland
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Vertreten durch</h3>
                <p className="text-gray-700">
                  Geschäftsführer: Max Mustermann
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Kontakt</h3>
                <p className="text-gray-700">
                  Telefon: +49 30 12345678<br />
                  E-Mail: info@ddr-kunstgalerie.de
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Registereintrag</h3>
                <p className="text-gray-700">
                  Eintragung im Handelsregister<br />
                  Registergericht: Amtsgericht Berlin-Charlottenburg<br />
                  Registernummer: HRB 123456 B
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Umsatzsteuer</h3>
                <p className="text-gray-700">
                  Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:<br />
                  DE123456789
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h3>
                <p className="text-gray-700">
                  Max Mustermann<br />
                  Musterstraße 123<br />
                  10117 Berlin
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">EU-Streitschlichtung</h3>
                <p className="text-gray-700">
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
                  <a href="https://ec.europa.eu/consumers/odr/" className="text-red-600 hover:text-red-800 ml-1">
                    https://ec.europa.eu/consumers/odr/
                  </a><br />
                  Unsere E-Mail-Adresse finden Sie oben im Impressum.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Verbraucherstreitbeilegung/Universalschlichtungsstelle</h3>
                <p className="text-gray-700">
                  Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Haftung für Inhalte</h3>
                <p className="text-gray-700">
                  Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Haftung für Links</h3>
                <p className="text-gray-700">
                  Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Urheberrecht</h3>
                <p className="text-gray-700">
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Impressum;

import React from 'react';
import developerImage from '../assets/images/V13A.jpg';

const pointsGroup1 = [
  "At Conscient, the mission has always been to create not just buildings, but a lifestyle that reflects soulful living.",
  "The brand focuses on getting the fundamentals of creation right — prioritizing quality, thoughtful design, and reliable delivery.",
  "With a philosophy rooted in value over profits, Conscient has consistently pursued excellence across all its developments.",
  "Over the past five decades, Conscient has successfully developed nearly 20,000 residential and commercial units.",
  "Their developments span across key regions including Delhi-NCR, Dehradun, and Goa, shaping communities with integrity and vision."
];

const pointsGroup2 = [
  "Conscient actively collaborates with world-renowned architects, designers, and consultants to elevate the design and living experience.",
  "These strategic partnerships have contributed to over 35 million sq. ft. of delivered and potential development.",
  "Their portfolio includes premium condominiums, luxury villas, institutional buildings, commercial/retail projects, and value housing.",
  "With meticulous planning and attention to detail, Conscient continues to transform spaces that inspire and endure."
];

const AboutDeveloper: React.FC = () => {
  return (
    <section className="py-20 bg-[#1A1815]">
      <div className="container mx-auto px-4">
        
        {/* Header Centered */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex flex-wrap justify-center items-center gap-2">
            <span className="text-white">About Developer -</span>
            <span
              className="font-bold"
              style={{
                background: 'linear-gradient(313deg, #8c5438 0%, #c76a43 50%, #f3b79e 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Conscient
            </span>
          </h2>
          <div
            className="w-20 h-1 mx-auto mb-6"
            style={{
              background: 'linear-gradient(313deg, #8c5438 0%, #c76a43 50%, #f3b79e 100%)'
            }}
          ></div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-12">

          {/* Left: Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={developerImage}
              alt="Conscient Developer"
              className="rounded-2xl shadow-lg object-cover w-full max-w-lg h-80 md:h-[28rem]"
            />
          </div>

          {/* Right: Content */}
          <div className="w-full md:w-1/2 flex flex-col items-start">
            
            <ul className="space-y-2 text-white/90 text-base list-disc pl-5">
              {pointsGroup1.map((point, idx) => (
                <li key={idx}>
                  <span className="block leading-relaxed" dangerouslySetInnerHTML={{ __html: point }} />
                </li>
              ))}
            </ul>

            <div className="mt-4" />

            <ul className="space-y-2 text-white/90 text-base list-disc pl-5">
              {pointsGroup2.map((point, idx) => (
                <li key={idx}>
                  <span className="block leading-relaxed" dangerouslySetInnerHTML={{ __html: point }} />
                </li>
              ))}
            </ul>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutDeveloper;

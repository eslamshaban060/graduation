const SolarPanelGrid = () => {
  return (
    <>
      <div className=" lg:flex flex-1 relative overflow-hidden gradient-hero">
        {/* Subtle Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-glow/10 via-transparent to-accent/10"></div>
        <div
          className="absolute top-20 right-20 w-64 h-64 rounded-full bg-accent/5 blur-3xl animate-pulse"
          style={{ animationDuration: "4s" }}
        ></div>
        <div
          className="absolute bottom-20 left-20 w-64 h-64 rounded-full bg-primary-foreground/5 blur-3xl animate-pulse"
          style={{ animationDuration: "5s", animationDelay: "1s" }}
        ></div>

        {/* Main Content */}
        <div className="relative z-10 flex items-center justify-center w-full h-full p-16">
          {/* Solar Panel Grid Visual */}
          <div className="grid grid-cols-5 gap-6">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary-foreground/25 to-primary-foreground/10 backdrop-blur-sm border-2 border-primary-foreground/30 hover:scale-110 hover:border-accent/50 transition-all duration-500 relative overflow-hidden group cursor-pointer shadow-lg"
                style={{
                  animation:
                    "panelFloat 3s ease-in-out infinite, fadeIn 0.8s ease-out forwards",
                  animationDelay: `${(i * 0.15) % 3}s, ${i * 0.05}s`,
                }}
              >
                {/* Grid pattern inside panel */}
                <div className="absolute inset-3 grid grid-cols-3 grid-rows-3 gap-1">
                  {[...Array(9)].map((_, j) => (
                    <div
                      key={j}
                      className="rounded-sm"
                      style={{
                        animation: "cellPulse 2s ease-in-out infinite",
                        animationDelay: `${(i * 0.1 + j * 0.15) % 2}s`,
                      }}
                    ></div>
                  ))}
                </div>

                {/* Energy flow effect - always active */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-accent/30 via-accent/10 to-transparent"
                  style={{
                    animation: "energyPulse 3s ease-in-out infinite",
                    animationDelay: `${(i * 0.2) % 3}s`,
                  }}
                ></div>

                {/* Shine effect on hover */}
                <div className="absolute -inset-full bg-gradient-to-r from-transparent via-accent/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shine"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animations CSS */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes panelFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes cellPulse {
          0%, 100% {
            opacity: 0.3;
            background: hsl(0, 0%, 100%, 0.2);
          }
          50% {
            opacity: 0.7;
            background: hsl(43, 100%, 60%, 0.4);
          }
        }
        
        @keyframes energyPulse {
          0%, 100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        @keyframes shine {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(100%) translateY(100%) rotate(45deg);
          }
        }
      `}</style>
    </>
  );
};

export default SolarPanelGrid;

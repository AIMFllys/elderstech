import React, { useEffect, useState } from "react";
import { FaCampground, FaFire, FaTint, FaHotTub, FaHiking } from "react-icons/fa";

const InteractiveSelector = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([]);

  const options = [
    {
      title: "养老机构走访",
      description: "关注医养服务供给与适老化设施",
      image:
        "https://images.unsplash.com/photo-1507537362848-9c7e70b7b5c1?auto=format&fit=crop&w=800&q=80",
      icon: <FaCampground size={24} className="text-white" />,
    },
    {
      title: "居家访谈",
      description: "理解老人真实体验与使用障碍",
      image:
        "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80",
      icon: <FaFire size={24} className="text-white" />,
    },
    {
      title: "社区健康点",
      description: "追踪智慧设备在基层的应用",
      image:
        "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80",
      icon: <FaTint size={24} className="text-white" />,
    },
    {
      title: "医疗场景",
      description: "聚焦慢病管理与随访需求",
      image:
        "https://images.unsplash.com/photo-1580281657527-47f249e8f0a7?auto=format&fit=crop&w=800&q=80",
      icon: <FaHotTub size={24} className="text-white" />,
    },
    {
      title: "产品共创",
      description: "记录“智护银龄”原型迭代",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
      icon: <FaHiking size={24} className="text-white" />,
    },
  ];

  const handleOptionClick = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    options.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions((prev) => [...prev, i]);
      }, 180 * i);
      timers.push(timer);
    });

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#222] font-sans text-white">
      <div className="w-full max-w-2xl px-6 mt-8 mb-2 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-tight drop-shadow-lg animate-fadeInTop delay-300">
          走访脉络与场景切换
        </h1>
        <p className="text-lg md:text-xl text-gray-300 font-medium max-w-xl mx-auto animate-fadeInTop delay-600">
          从机构到家庭，从医疗到产品共创，我们记录每一次真实反馈。
        </p>
      </div>

      <div className="h-12" />

      <div className="options flex w-full max-w-[900px] min-w-[600px] h-[400px] mx-0 items-stretch overflow-hidden relative">
        {options.map((option, index) => (
          <div
            key={index}
            className={`
              option relative flex flex-col justify-end overflow-hidden transition-all duration-700 ease-in-out
              ${activeIndex === index ? "active" : ""}
            `}
            style={{
              backgroundImage: `url('${option.image}')`,
              backgroundSize: activeIndex === index ? "auto 100%" : "auto 120%",
              backgroundPosition: "center",
              backfaceVisibility: "hidden",
              opacity: animatedOptions.includes(index) ? 1 : 0,
              transform: animatedOptions.includes(index)
                ? "translateX(0)"
                : "translateX(-60px)",
              minWidth: "60px",
              minHeight: "100px",
              margin: 0,
              borderRadius: 0,
              borderWidth: "2px",
              borderStyle: "solid",
              borderColor: activeIndex === index ? "#fff" : "#292929",
              cursor: "pointer",
              backgroundColor: "#18181b",
              boxShadow:
                activeIndex === index
                  ? "0 20px 60px rgba(0,0,0,0.50)"
                  : "0 10px 30px rgba(0,0,0,0.30)",
              flex: activeIndex === index ? "7 1 0%" : "1 1 0%",
              zIndex: activeIndex === index ? 10 : 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              position: "relative",
              overflow: "hidden",
              willChange:
                "flex-grow, box-shadow, background-size, background-position",
            }}
            onClick={() => handleOptionClick(index)}
          >
            <div
              className="shadow absolute left-0 right-0 pointer-events-none transition-all duration-700 ease-in-out"
              style={{
                bottom: activeIndex === index ? "0" : "-40px",
                height: "120px",
                boxShadow:
                  activeIndex === index
                    ? "inset 0 -120px 120px -120px #000, inset 0 -120px 120px -80px #000"
                    : "inset 0 -120px 0px -120px #000, inset 0 -120px 0px -80px #000",
              }}
            ></div>

            <div className="label absolute left-0 right-0 bottom-5 flex items-center justify-start h-12 z-2 pointer-events-none px-4 gap-3 w-full">
              <div className="icon min-w-[44px] max-w-[44px] h-[44px] flex items-center justify-center rounded-full bg-[rgba(32,32,32,0.85)] backdrop-blur-[10px] shadow-[0_1px_4px_rgba(0,0,0,0.18)] border-2 border-[#444] flex-shrink-0 flex-grow-0 transition-all duration-200">
                {option.icon}
              </div>
              <div className="info text-white whitespace-pre relative">
                <div
                  className="main font-bold text-lg transition-all duration-700 ease-in-out"
                  style={{
                    opacity: activeIndex === index ? 1 : 0,
                    transform:
                      activeIndex === index
                        ? "translateX(0)"
                        : "translateX(25px)",
                  }}
                >
                  {option.title}
                </div>
                <div
                  className="sub text-base text-gray-300 transition-all duration-700 ease-in-out"
                  style={{
                    opacity: activeIndex === index ? 1 : 0,
                    transform:
                      activeIndex === index
                        ? "translateX(0)"
                        : "translateX(25px)",
                  }}
                >
                  {option.description}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeInFromTop {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInTop {
          opacity: 0;
          transform: translateY(-20px);
          animation: fadeInFromTop 0.8s ease-in-out forwards;
        }

        .delay-300 {
          animation-delay: 0.3s;
        }

        .delay-600 {
          animation-delay: 0.6s;
        }
      `}</style>
    </div>
  );
};

export default InteractiveSelector;

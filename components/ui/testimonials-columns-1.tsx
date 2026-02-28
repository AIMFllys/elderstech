"use client";

import React from "react";
import { motion } from "motion/react";

export interface Testimonial {
    text: string;
    image: string;
    name: string;
    role: string;
}

export const testimonials: Testimonial[] = [
    {
        text: "由于老年人视力下降和眼部疾病等问题，许多人对图文健康宣传难以接收。能转为音频形式会让老年群体更容易接受。",
        image: encodeURI("/实践成果/日志/杨静萱_7.png"),
        name: "社区医护人员",
        role: "内蒙古医院调研（赵梓舒）",
    },
    {
        text: "我觉得应该标识的明确一点，想让它干什么就干什么。许多我们自己办不到的事情，真想让智护设备多帮帮忙。",
        image: encodeURI("/实践成果/日志/周嘉琪_1.png"),
        name: "高龄受访老人",
        role: "内蒙古医院调研（赵梓舒）",
    },
    {
        text: "我希望有个手机软件，能让我随时看到不在身边的父母的健康状况。这样即使我不在，也能及时了解老人的安危。",
        image: encodeURI("/实践成果/日志/何佳欢_8-1.jpg"),
        name: "常居外地家属",
        role: "内蒙古医院调研（赵梓舒）",
    },
    {
        text: "要是能直接对着机器‘说’想要啥，比如‘我要软饭+不甜的汤’，它就能帮记下来，不用总麻烦护士写，那该多好。",
        image: encodeURI("/实践成果/日志/张星睿_3-1.jpg"),
        name: "住院点餐老人",
        role: "适老化餐食调研（杨静萱）",
    },
    {
        text: "我希望能直接在手机上看到妈今天的餐食是不是符合糖尿病要求，不想每天打电话问。同时最好能远程帮老人点餐。",
        image: encodeURI("/实践成果/日志/赵梓舒_2.jpg"),
        name: "住院病人家属",
        role: "适老化餐食调研（杨静萱）",
    },
    {
        text: "备餐屏幕如果能直观显示‘12床：软饭+无糖+剪碎’，我就不用再翻明细纸单了，能按特殊需求分类做，效率高还不错。",
        image: encodeURI("/实践成果/日志/罗宇然_5.png"),
        name: "机构备餐师傅",
        role: "适老化餐食调研（杨静萱）",
    },
    {
        text: "用得上愿意用的就是简单好操作，字大声音响，少点步骤，能语音控制最好。还有就是设备必须耐用、坏了要好修。",
        image: encodeURI("/实践成果/日志/李文龙_4.jpg"),
        name: "养老院居住老人",
        role: "沫阳镇养老院调研（罗宇然等）",
    },
    {
        text: "目前我们这最大的困难是，养老机构的医疗人员没有职称评定等上升通道，这导致机构很难留住专业对口的医疗人才。",
        image: encodeURI("/实践成果/日志/何佳欢_8-2.jpg"),
        name: "养老中心管理者",
        role: "机构调研（丁文轩）",
    },
    {
        text: "痛点其实就是自己没在老人身边，要有啥事情不能第一时间帮忙解决。像日常督促吃药、健康预警这块只能瞎操心。",
        image: encodeURI("/实践成果/日志/杨佳怡_6.jpg"),
        name: "独居老人子女",
        role: "社区家属访谈（杨佳怡）",
    }
];

export const TestimonialsColumn = (props: {
    className?: string;
    testimonials: typeof testimonials;
    duration?: number;
}) => {
    return (
        <div className={props.className}>
            <motion.div
                animate={{
                    translateY: "-50%",
                }}
                transition={{
                    duration: props.duration || 10,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                }}
                className="flex flex-col gap-6 pb-6"
            >
                {[
                    ...new Array(2).fill(0).map((_, index) => (
                        <React.Fragment key={index}>
                            {props.testimonials.map(({ text, image, name, role }, i) => (
                                <div className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-xl max-w-xs w-full text-white" key={i}>
                                    <div className="text-sm md:text-base leading-relaxed text-gray-200">"{text}"</div>
                                    <div className="flex items-center gap-3 mt-5">
                                        <img
                                            width={40}
                                            height={40}
                                            src={image}
                                            alt={name}
                                            className="h-10 w-10 rounded-full object-cover border border-white/20"
                                        />
                                        <div className="flex flex-col">
                                            <div className="font-semibold tracking-tight leading-5 text-white">{name}</div>
                                            <div className="text-xs leading-5 text-gray-400 tracking-tight mt-0.5">{role}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </React.Fragment>
                    )),
                ]}
            </motion.div>
        </div>
    );
};

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export const Testimonials = () => {
    return (
        <section className="bg-[#222] py-20 relative overflow-hidden">
            <div className="container z-10 mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center justify-center max-w-[700px] mx-auto"
                >
                    <div className="flex justify-center mb-6">
                        <div className="border border-white/20 text-white/80 py-1 px-5 rounded-full text-sm font-medium tracking-wide bg-white/5 backdrop-blur-md">
                            实地走访记录摘要
                        </div>
                    </div>

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mt-2 drop-shadow-lg text-center">
                        心声与痛点，听见真实诉求
                    </h2>
                    <p className="text-center mt-6 text-lg text-gray-300 max-w-2xl font-medium leading-relaxed">
                        我们走进机构、社区、医院，聆听老人家、家属与医护的第一手反馈。
                        用智能填补关怀空缺，用适老化的交互设计温暖长者的岁月。
                    </p>
                </motion.div>

                <div className="flex justify-center gap-6 mt-16 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] h-[600px] overflow-hidden">
                    <TestimonialsColumn testimonials={firstColumn} duration={35} />
                    <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={45} />
                    <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={40} />
                </div>
            </div>
        </section>
    );
};

export default Testimonials;

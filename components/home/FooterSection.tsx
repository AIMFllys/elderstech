"use client";

import Image from "next/image";
import Link from "next/link";
import { footer } from "@/lib/data";
import { HighlighterItem, HighlightGroup, Particles } from "@/components/ui/highlighter/index";
import { Mail, Phone, MessageCircle } from "lucide-react";

export function FooterSection() {
  return (
    <>
      <section id="footer" className="relative mx-auto mb-20 mt-6 max-w-5xl px-4">
        <HighlightGroup className="group h-full">
          <HighlighterItem className="rounded-3xl p-6">
            <div className="relative z-20 h-full overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-black">
              <Particles
                className="absolute inset-0 -z-10 opacity-10 transition-opacity duration-1000 ease-in-out group-hover:opacity-100"
                quantity={160}
                color={"#555555"}
                vy={-0.2}
              />
              <div className="flex justify-center">
                <div className="flex h-full flex-col justify-center gap-10 p-6 md:h-[280px] md:flex-row">
                  <div className="relative mx-auto h-[240px] w-[260px] md:h-[240px] md:w-[260px]">
                    <div className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-hust/20" />
                    <div className="absolute left-6 top-10 rounded-3xl border border-slate-400 bg-slate-200 px-2 py-1.5 text-xs opacity-70 dark:border-slate-600 dark:bg-slate-800">
                      实地访谈
                    </div>
                    <div className="absolute right-6 top-16 rounded-3xl border border-slate-400 bg-slate-200 px-2 py-1.5 text-xs opacity-70 dark:border-slate-600 dark:bg-slate-800">
                      产品共创
                    </div>
                    <div className="absolute left-10 bottom-12 rounded-3xl border border-slate-400 bg-slate-200 px-2 py-1.5 text-xs opacity-70 dark:border-slate-600 dark:bg-slate-800">
                      数据分析
                    </div>
                    <div className="absolute right-8 bottom-6 rounded-3xl border border-slate-400 bg-slate-200 px-2 py-1.5 text-xs opacity-70 dark:border-slate-600 dark:bg-slate-800">
                      需求归纳
                    </div>
                  </div>

                  <div className="flex h-full flex-col justify-center p-2 md:ml-10 md:w-[420px]">
                    <div className="flex flex-col items-center md:items-start">
                      <h3 className="mt-6 pb-1 font-bold">
                        <span className="text-2xl md:text-4xl">
                          一起关注智慧医养的真实需求
                        </span>
                      </h3>
                    </div>
                    <p className="mb-4 text-slate-400">
                      欢迎通过邮件或 QQ 交流调研心得与合作建议。
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <a
                        href={`mailto:${footer.email}`}
                        className="inline-flex items-center gap-2 rounded-md bg-hust px-4 py-2 text-white"
                      >
                        <Mail className="h-4 w-4" />
                        写邮件
                      </a>
                      <span className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-4 py-2 text-slate-600 dark:border-slate-700 dark:text-slate-300">
                        <MessageCircle className="h-4 w-4" />
                        QQ：{footer.qq}
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-4 py-2 text-slate-600 dark:border-slate-700 dark:text-slate-300">
                        <Phone className="h-4 w-4" />
                        负责人：{footer.leader}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </HighlighterItem>
        </HighlightGroup>
      </section>

      <footer className="py-12 px-4 text-foreground">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h4 className="text-xl font-bold mb-4 text-hust-light">
                {footer.project}
              </h4>
              <p className="text-sm text-gray-400">{footer.projectName}</p>
              <p className="text-sm text-gray-400 mt-1">{footer.specialName}</p>
              <p className="text-sm text-gray-400 mt-1">
                所属院系：{footer.college}
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">联系方式</h4>
              <p className="text-sm text-gray-400">
                指导教师：{footer.instructors}
              </p>
              <p className="text-sm text-gray-400">负责人：{footer.leader}</p>
              <p className="text-sm text-gray-400">网站技术人员：{footer.tech}</p>
              <p className="text-sm text-gray-400 mt-2 flex items-center justify-center md:justify-start gap-2">
                <Image
                  src={footer.iconEmail}
                  alt="邮箱"
                  width={20}
                  height={20}
                  unoptimized
                />
                <a
                  href={`mailto:${footer.email}`}
                  className="hover:text-hust-light"
                >
                  {footer.email}
                </a>
              </p>
              <p className="text-sm text-gray-400 flex items-center justify-center md:justify-start gap-2 mt-1">
                <Image
                  src={footer.iconQQ}
                  alt="QQ"
                  width={20}
                  height={20}
                  unoptimized
                />
                QQ：{footer.qq}
              </p>
              <p className="text-sm mt-2">
                <a
                  href={footer.personalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-hust-light"
                >
                  个人介绍
                </a>
              </p>
              <p className="text-sm mt-1">
                <Link
                  href={footer.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-hust-light"
                >
                  GitHub: {footer.github}（项目开源）
                </Link>
              </p>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-lg font-bold mb-4">合作单位</h4>
              <div className="flex gap-6">
                <Image
                  src={footer.logoHust}
                  alt="华中科技大学"
                  width={80}
                  height={80}
                  className="object-contain"
                  unoptimized
                />
                <Image
                  src={footer.logoTongji}
                  alt="同济医学院"
                  width={80}
                  height={80}
                  className="object-contain"
                  unoptimized
                />
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
            <p>{footer.disclaimer}</p>
          </div>
        </div>
      </footer>
    </>
  );
}

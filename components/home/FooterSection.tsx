"use client";

import Image from "next/image";
import Link from "next/link";
import { footer } from "@/lib/data";

export function FooterSection() {
  return (
    <footer className="bg-ink dark:bg-black text-white py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h4 className="text-xl font-bold mb-4 text-hust-light">
              {footer.project}
            </h4>
            <p className="text-sm text-gray-400">{footer.projectName}</p>
            <p className="text-sm text-gray-400 mt-1">{footer.specialName}</p>
            <p className="text-sm text-gray-400 mt-1">所属院系：{footer.college}</p>
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
  );
}

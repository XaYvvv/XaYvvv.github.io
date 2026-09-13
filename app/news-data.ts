type NewsItem = {
  title: string;
  href: string;
  publishedAt: string | null;
};

// Use the linked article's publication date (YYYY-MM-DD), not the event date.
// Unverified dates stay null; supplied titles are retained until verified.
const items: NewsItem[] = [
  {
    title: "助力青年成长 车企如何念好“人才经”",
    href: "https://zqb.cyol.com/html/2023-12/14/nw.D110000zgqnb_20231214_1-12.htm",
    publishedAt: "2023-12-14",
  },
  {
    title: "满分热爱创造无限未来！东风日产校园行北京理工大学站完美收官",
    href: "https://www.sohu.com/a/738723755_137545",
    publishedAt: "2023-11-23",
  },
  {
    title: "国际仿生工程学会 | 北京理工大学学生分会 招新宣讲&入会邀请",
    href: "https://mp.weixin.qq.com/s/gX6Mkmpb5eUZmD8XkKkf6Q",
    publishedAt: "2025-12-25",
  },
  {
    title: "铂力特金属 3D 打印赋能赛车工程",
    href: "https://mp.weixin.qq.com/s/1uODbIPsIRNT_PzU5hc6pQ",
    publishedAt: "2024-12-05",
  },
  {
    title: "2026仿生科学与工程国际青年学术会议（IYCBSE 2026）在珠海成功举办",
    href: "https://mp.weixin.qq.com/s/O5LMixTaP_A5uaNzX2PsOQ?scene=1",
    publishedAt: "2026-04-28",
  },
  {
    title: "高水平学术前沿讲座暨国际仿生工程学会北京理工大学学生分会成立",
    href: "https://mp.weixin.qq.com/s/ielkm7NSUs1RY1KCFxpYHg?scene=1",
    publishedAt: "2025-12-29",
  },
  {
    title: "BITFSAE公众号 【人物】 专栏 被同龄人叫老师是种什么样的体验",
    href: "https://mp.weixin.qq.com/s/VPYYvHdOm8VhihbarvSUqQ",
    publishedAt: "2024-05-01",
  },
  {
    title: "汽车设计频频“撞脸”，听北理工学子怎么说",
    href: "https://mp.weixin.qq.com/s/ZlyLRGn4DWrylOxEjjYclQ",
    publishedAt: "2025-06-20",
  },
  {
    title: "北理工第十五届江麓奖学金答辩仪式成功举办",
    href: "https://mp.weixin.qq.com/s/_a3QKQHj5ZMSXkj7Yppghw",
    publishedAt: "2024-01-08",
  },
];

// Newest first. Keep entries with unknown dates at the end in input order.
export const newsItems = [...items].sort((a, b) =>
  (b.publishedAt ?? "").localeCompare(a.publishedAt ?? "")
);

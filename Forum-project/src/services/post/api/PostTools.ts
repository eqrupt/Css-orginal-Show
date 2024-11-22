import { PostDTO } from '@/types/PostandComentDTO';

/**
 * 生成指定数量的随机帖子
 * @param count 要生成的帖子数量
 * @returns 生成的帖子数组
 */
export const generateRandomPosts = (count: number): PostDTO[] => {
    const posts: PostDTO[] = [];
    const titles: string[] = ['今天天气真好', '分享一个小技巧', '求助一个问题', '大家来讨论下', '有趣的发现'];
    const contents: string[] = [
        '今天阳光明媚,心情很好~',
        '最近学到了一个很实用的方法,分享给大家...',
        '遇到一个技术难题,希望有经验的朋友能帮忙解答', 
        '关于这个话题,我有一些想法想和大家交流',
        '偶然发现了一个有意思的现象,和大家分享一下'
    ];

    for (let i = 0; i < count; i++) {
        const randomTitle = titles[Math.floor(Math.random() * titles.length)];
        const randomContent = contents[Math.floor(Math.random() * contents.length)];
        const currentTime = new Date();
        
        const post: PostDTO = {
            id: `post_${Date.now()}_${i}`,
            title: randomTitle,
            content: randomContent,
            authorId: `user_${Math.floor(Math.random() * 1000)}`,
            createTime: currentTime,
            updateTime: currentTime,
            comments: []
        };
        
        posts.push(post);
    }

    const existingPosts: PostDTO[] = JSON.parse(localStorage.getItem('Posts') || '[]');
    const allPosts: PostDTO[] = [...existingPosts, ...posts];
    localStorage.setItem('Posts', JSON.stringify(allPosts));

    return posts;
}
// 初始化帖子数据
export const initializePosts = () => {
    const existingPosts = localStorage.getItem('Posts');
    if (!existingPosts || JSON.parse(existingPosts).length === 0) {
        generateRandomPosts(5); // 生成5个初始帖子
    }
}

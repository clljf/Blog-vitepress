import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/Blog-vitepress/',
  title: '我的博客',
  description: '这是我的博客',
  head: [['link', { rel: 'icon', href: '/logo.jpg' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    outlineTitle: '文章目录',
    outline: {
      level: [2, 6]
    },
    nav: [
      { text: '首页', link: '/' },
      { text: '示例', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'js学习',
        items: [
          { text: '实现富文本内容复制', link: '/markdown-examples' },
          { text: 'object.definePorperty', link: '/api-examples' },
          { text: '实现深拷贝', link: '/deep-clone' }
        ]
      },
      {
        text: 'css学习',
        items: [
          { text: '实现走马灯效果', link: '/css-marquee' },
          { text: 'flex布局', link: '/css-flex' }
        ]
      }
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/clljf' }],
    //底部配置
    footer: {
      copyright: 'Copyright@ 2025 pinkKnight'
    },
    //搜索栏
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换'
            }
          }
        }
      }
    }
  }
});

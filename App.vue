<script>
import { fullTabBarList, basicTabBarList } from '@/common/config/tabbar'
import { getAction } from '@/common/store/manage'

export default {
  onLaunch: function () {
    console.log('App Launch')
    this.initTabBar()
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  methods: {
    async initTabBar() {
      try {
        // 调用接口检查用户权限
        const res = await getAction('/app/auth/checkValid')
        if (res.success) {
          // 如果没有权限，隐藏金融tab
          if (!res.result) {
            // 隐藏金融tab（索引为1）
            try {
              uni.setTabBarItem({
                index: 1,
                visible: false,
              })
            } catch (err) {
              console.error('隐藏tabBar失败:', err)
            }
          }
        }
      } catch (error) {
        console.error('初始化 tabBar 失败:', error)
        // 接口调用失败时，默认隐藏金融tab
        try {
          uni.setTabBarItem({
            index: 1,
            visible: false,
          })
        } catch (err) {
          console.error('隐藏tabBar失败:', err)
        }
      }
    },
  },
}
</script>

<style lang="scss">
/* 引入uView基础样式 */
@import 'uview-plus/index.scss';

/* 引入动画样式 */
@import '@/styles/animation.scss';

@import '@/styles/theme.scss';

/* 其他全局样式 */
</style>

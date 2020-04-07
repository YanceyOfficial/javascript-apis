import React from 'react'
import Layout from '@theme/Layout'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import styles from './styles.module.css'

function About() {
  const context = useDocusaurusContext()
  const { siteConfig = {} } = context
  return (
    <Layout
      title={`${siteConfig.title}`}
      description='Description will go into a meta tag in <head />'
    >
      <main className={styles.aboutContainer}>
        <p>
          算上实习，从事前端工作差不多有一年半的时间了。得怀于兴趣使然，热衷于玩一些前沿的技术（瞎折腾），也搞了一些个人项目。
          但在阅读框架源码以求进阶时，时常会遇到瓶颈，究其原因还是基础不牢。最近在看
          winter 大佬的 《重学前端》 系列，更加感受到了自己功力太浅...
          这些也是促成写《JavaScript 全解析系列》的原因。
        </p>
        <p>
          这个系列计划出三季，分别是 ECMAScript、BOM、DOM。 其中 ECMAScript
          会涉及到六大基本类型相关 API 以及 Object, Function, Array, Math,
          RegExp, Date, Map, Set, Promise, Proxy, Reflect. 而 BOM 和 DOM
          会列出常用的那些 API（毕竟坑太多，无法面面俱到）。
        </p>
        <p>
          虽说是 API
          全解析，但也会忽略一些过时的方法，如果你认为哪些是不应被忽略掉的，请跟我留言。
        </p>
        <p>
          为了能更好地接受建议与批评，每篇文章的底部都加载了 Gitalk
          评论插件，评论会直达相应 GitHub
          issue，欢迎大家一起讨论，毕竟我还功力尚浅。
        </p>
        <p>
          为了保证文章的质量和准确性，代码提交时都会走持续集成和代码质量检测。并且我用
          Jest 给大多数示例做了测试，测试文件在根目录下的 test
          文件夹下，示例文件在根目录下的 examples 文件夹下。如果大家想 PR
          的话，请务必更新相关的测试用例。
        </p>
        <p>
          在写作过程中，经常会发出 “原来还有这种用法啊”
          的感受。现把这个系列开源出来，也希望本系列能对大家有所帮助。
        </p>
        <p>
          最后是
          <a href='mailto:yanceyofficial@gmail.com'>个人邮箱</a>
          ，欢迎来撩，也欢迎北京不错的厂来撩。如果觉得文章不错，烦请在{' '}
          <a href='https://github.com/YanceyOfficial/javascript-apis'>
            GitHub
          </a>{' '}
          点个赞。因服务器在境外，如果遇到打不开的情况，你懂的。
        </p>
        <p>以上、よろしく。</p>
        <p>Yancey Leo</p>
      </main>
    </Layout>
  )
}

export default About

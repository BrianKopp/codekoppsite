import axios from 'axios'
import React, { Component } from 'react'
import { ServerStyleSheet } from 'styled-components'
import path from 'path'
import fs from 'fs-extra'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

const contentRoot = 'content'

export default {
  getSiteData: () => ({
    title: 'Code Kopp',
  }),
  getRoutes: async () => {
    const remarkParser = remark().use(html)
    const contentFullPath = path.resolve(__dirname, contentRoot)
    const contentArray = fs.readdirSync(contentFullPath).map(file => {
      const { data, content } = matter(fs.readFileSync(path.resolve(contentFullPath, file), 'utf8'))
      const { contents } = remarkParser.processSync(content)
      return { data, contents }
    })
    return [
      {
        path: '/',
        component: 'src/containers/Home',
      },
      {
        path: '/about',
        component: 'src/containers/About',
      },
      {
        path: '/blog',
        component: 'src/containers/Blog',
        getData: () => ({
          data: contentArray.map(({data}) => data),
        }),
        children: contentArray.map(({ data, contents }) => ({
          path: `post/${data.id}`,
          component: 'src/containers/Post',
          getData: () => ({
            data, contents
          }),
        })),
      },
      {
        is404: true,
        component: 'src/containers/404',
      },
    ]
  },
  renderToHtml: (render, Comp, meta) => {
    const sheet = new ServerStyleSheet()
    const html = render(sheet.collectStyles(<Comp />))
    meta.styleTags = sheet.getStyleElement()
    return html
  },
  Document: class CustomHtml extends Component {
    render () {
      const {
        Html, Head, Body, children, renderMeta,
      } = this.props

      return (
        <Html>
          <Head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            {renderMeta.styleTags}
          </Head>
          <Body>{children}</Body>
        </Html>
      )
    }
  },
}

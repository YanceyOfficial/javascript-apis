/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react')

class Footer extends React.Component {
  docUrl(doc, language) {
    const {
      config: { baseUrl, docsUrl },
    } = this.props
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`
    const langPart = `${language ? `${language}/` : ''}`
    return `${baseUrl}${docsPart}${langPart}${doc}`
  }

  pageUrl(doc, language) {
    const {
      config: { baseUrl },
    } = this.props
    return baseUrl + (language ? `${language}/` : '') + doc
  }

  render() {
    const {
      config: {
        baseUrl,
        footerIcon,
        title,
        repoUrl,
        organizationName,
        projectName,
        twitterUsername,
        facebookAppId,
        url,
        copyright,
        gitterUrl,
      },
    } = this.props
    return (
      <footer className='nav-footer' id='footer'>
        <section className='sitemap'>
          <a href={baseUrl} className='nav-home'>
            {footerIcon && (
              <img
                src={baseUrl + footerIcon}
                alt={title}
                width='66'
                height='58'
              />
            )}
          </a>
          <div>
            <h5>Docs</h5>
            <a href={this.docUrl('ECMAScript/ecmascript/')}>ECMAScript</a>
            <a href={this.docUrl('BOM/bom/')}>BOM</a>
            <a href={this.docUrl('DOM/dom/')}>DOM</a>
          </div>
          <div>
            <h5>Community</h5>
            <a href={this.docUrl('about.html')}>About</a>
            <a href={gitterUrl} target='_blank' rel='noreferrer noopener'>
              Gitter
            </a>
            <a href={`${repoUrl}/issues`}>Bug report</a>
          </div>
          <div>
            <h5>More</h5>
            <div className='social'>
              <iframe
                src={`https://ghbtns.com/github-btn.html?user=${organizationName}&repo=${projectName}&type=star&count=true`}
                frameBorder='0'
                scrolling='0'
                width='170px'
                height='20px'
                style={{ marginTop: '6px' }}
              ></iframe>
            </div>
            {twitterUsername && (
              <div className='social'>
                <a
                  href={`https://twitter.com/${twitterUsername}`}
                  className='twitter-follow-button'
                >
                  Follow @{twitterUsername}
                </a>
              </div>
            )}
            {facebookAppId && (
              <div className='social'>
                <div
                  className='fb-like'
                  data-href={url}
                  data-colorscheme='dark'
                  data-layout='standard'
                  data-share='true'
                  data-width='225'
                  data-show-faces='false'
                />
              </div>
            )}
          </div>
        </section>
        <a
          href='https://opensource.facebook.com/'
          target='_blank'
          rel='noreferrer noopener'
          className='fbOpenSource'
        ></a>
        <section className='copyright'>{copyright}</section>
      </footer>
    )
  }
}

module.exports = Footer

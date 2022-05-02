import React from 'react'

import './layout.scss'

export function Layout(props: React.PropsWithChildren<{}>) {
  const { children } = props

  return <div className="layout-container">{children}</div>
}

export function LayoutSidebar(props: React.PropsWithChildren<{}>) {
  const { children } = props

  return <div className="layout-sidebar">{children}</div>
}

export function LayoutMain(props: React.PropsWithChildren<{}>) {
  const { children } = props

  return <div className="layout-main">{children}</div>
}

Layout.Sidebar = LayoutSidebar
Layout.Main = LayoutMain

import { autocomplete } from "@algolia/autocomplete-js"
import { createRoot } from "react-dom"
import type { Root } from "react-dom"
import React, { createElement, Fragment, useEffect, useRef } from "react"

export function Autocomplete(props) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const panelRootRef = useRef<Root | null>(null)
  const rootRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!containerRef.current) {
      return undefined
    }

    const search = autocomplete({
      container: containerRef.current,
      renderer: { createElement, Fragment },
      render({ children }, root) {
        if (!panelRootRef.current || rootRef.current !== root) {
          rootRef.current = root

          panelRootRef.current?.unmount()
          panelRootRef.current = createRoot(root)
        }

        panelRootRef.current.render(children)
      },
      ...props,
    })

    return () => {
      search.destroy()
    }
  }, [props])

  return <div className="w-full" ref={containerRef} />
}

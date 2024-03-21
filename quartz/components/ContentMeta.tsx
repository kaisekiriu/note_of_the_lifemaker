import { formatDate, getDate } from "./Date"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import readingTime from "reading-time"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"
import { JSX } from "preact/jsx-runtime"

interface ContentMetaOptions {
  /**
   * Whether to display reading time
   */
  showReadingTime: boolean
}

const defaultOptions: ContentMetaOptions = {
  showReadingTime: true,
}

export default ((opts?: Partial<ContentMetaOptions>) => {
  // Merge options with defaults
  const options: ContentMetaOptions = { ...defaultOptions, ...opts }

  function ContentMetadata({ cfg, fileData, displayClass }: QuartzComponentProps) {
    const text = fileData.text

    if (text) {
      // const segments: string[] = []
      const segments: JSX.Element[] = []

      // if (fileData.dates) {
      //   segments.push(formatDate(getDate(cfg, fileData)!, cfg.locale))
      // }
      if (fileData.dates?.created) {
        segments.push(<span>created: {formatDate(fileData.dates.created, cfg.locale)}</span>)
      }
      if (fileData.dates?.modified) {
        segments.push(<span> updated: {formatDate(fileData.dates.modified, cfg.locale)}</span>)
      }

      // Display reading time if enabled
      if (options.showReadingTime) {
        // const { minutes, words: _words } = readingTime(text)
        // const displayedTime = i18n(cfg.locale).components.contentMeta.readingTime({
        //   minutes: Math.ceil(minutes),
        // })
        const { text: timeTaken, words: _words } = readingTime(text)
        // segments.push(displayedTime)
        segments.push(<span>{timeTaken}</span>)
      }

      // return <p class={classNames(displayClass, "content-meta")}>{segments.join(", ")}</p>
      return (
        <p class={classNames(displayClass, "content-meta")}>
          {segments.map((meta, idx) => (
            <>
              {meta}
            </>
          ))}
        </p>
      )
    } else {
      return null
    }
  }

  ContentMetadata.css = `
  .content-meta {
    margin-top: 0;
    color: var(--gray);
  }
  `
  return ContentMetadata
}) satisfies QuartzComponentConstructor

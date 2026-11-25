interface MarkdownNode {
  type: string
  depth?: number
  children?: MarkdownNode[]
}

// The post title is h1. Normalize Markdown sections below it without skipping levels.
export function remarkHeadingOrder() {
  return (tree: MarkdownNode) => {
    const levels: number[] = []
    function visit(node: MarkdownNode) {
      if (node.type === 'heading' && node.depth !== undefined) {
        const originalDepth = node.depth
        while (levels.length && levels[levels.length - 1] >= originalDepth) levels.pop()
        levels.push(originalDepth)
        node.depth = Math.min(6, levels.length + 1)
      }
      node.children?.forEach(visit)
    }
    visit(tree)
  }
}

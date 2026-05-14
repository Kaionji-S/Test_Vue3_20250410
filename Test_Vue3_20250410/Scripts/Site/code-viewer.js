const CodeViewer = {
    props: ['code', 'lang'],

    template: `
    <pre>
      <code ref="codeEl" :class="'language-' + lang"></code>
    </pre>
  `,

    mounted() {
        this.renderHighlight();
    },

    updated() {
        this.renderHighlight();
    },

    methods: {

        renderHighlight() {

            const el = this.$refs.codeEl;

            el.textContent = this.code;

            delete el.dataset.highlighted;

            hljs.highlightElement(el);
        }
    }
};


<code-viewer
    lang="csharp"
  : code="item.code">
</code-viewer>


.code - block {
    width: 100 %;
    max - width: 100 %;
    overflow - x: auto;
    min - width: 0;
}

.code - block pre {
    margin: 0;
    overflow - x: auto;
}

.code - block code {
    white - space: pre;
}

<div class="code-block">
    <pre>
        <code class="language-csharp">
            {{ code }}
        </code>
    </pre>
</div>
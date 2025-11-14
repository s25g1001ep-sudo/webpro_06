```mermaid
stateDiagram-v2
    [*] --> /public/keiyo_add.html
    /public/keiyo_add.html --> /keiyo_add
    /keiyo_add --> /public/keiyo_add.html:リダイレクト
```

```mermaid
stateDiagram-v2
    [*] --> /public/keiyo_add.html
    /public/keiyo_add.html --> /keiyo_add
    /keiyo_add --> /view/keiyo.ejsによる一覧表示
```
---
layout: post
title: IdeaVimでIntelliJ(Android Studio)をVimっぽく操作しよう
---

# IdeaVimとは

 [IdeaVim](https://plugins.jetbrains.com/plugin/164-ideavim)  

IdeaVimは、**IntelliJやAndroid StudioなどのJetBrains系列のIDEで使えるVimプラグイン** です。このプラグインを導入することでIntelliJをVimっぽく操作できるようになります。  
Githubのリポジトリ([JetBrains/ideavim](https://github.com/JetBrains/ideavim))を見てもらうとわかる通り、JetBrainsの公式プラグインです。(IntelliJの初回起動時にもちゃっかりオススメされます)

## IdeaVimがサポートしている機能の一例

細かい機能まで列挙するのは難しいので、普段自分がよく使う機能に絞ってその対応状況をまとめました。  
より詳しく知りたいという方はGithubのリポジトリ([JetBrains/ideavim](https://github.com/JetBrains/ideavim))のREADMEやソースコードをご覧になってみてください。

|機能|対応状況|
|:-------|:---|
|モード|ノーマルモード、インサートモード、ビジュアルモードが存在|
|基本的な編集操作|ヤンク(`y`), 削除(`d`), 変更(`c`), Undo(`u`), Redo(`Ctrl-r`),<br>テキストオブジェクト操作(`ciw`, `vi(`, ...) ... などなど使用可能<br>(Vimの操作コマンドは他にも沢山あると思いますが、行いたい操作が未実装だったという経験はあまり無いです)|
|検索| Vimと同様に `/` による検索が可能、`:set incsearch`によるインクリメンタルサーチも
|置換| Vimと同様に `:s`, `:%s`, `:'<,'>s` などで正規表現による置換が可能|
|コマンド| `:w`, `:q`, `:tabnew`, `:split`, `:vsplit`, 一部`:set`オプション などなど |
|設定・キーマップ| 各種`map`や一部`set` オプションを `.ideavimrc` に記述可能。<br>また、IntelliJの機能をキーマッピングすることも可能(後の章で詳しく説明)|
|マクロ|利用可能|
|レジスタ|利用可能|
|その他|`:set surrond` することで[vim-surround](https://github.com/tpope/vim-surround)を再現した機能を利用可能|

## なぜIdeaVimを使うか

(※**個人的には**) JetBrains系列のIDEとVimのそれぞれに対して以下の点に良さを感じています。

- IDE: 補完、コードジャンプ、リファクタ機能などの強さ、またそれらの設定の容易さ
- Vim: 操作性 (もはやVimキーバインドとかモードの概念が無いとコード書きたくない)

**IntelliJにIdeaVimプラグインを導入することで上記の双方の利点を同時に享受することができ**、快適なIntelliJライフを送れるようになりました。  
細かい部分の挙動などはまだまだ本家Vimとの差分もありますが、**自分のような比較的ライトなVimユーザーがVimに求めている機能については、IdeaVimはその多くをカバーできているのではないか** と思います。  
この記事ではIdeaVimの機能や設定方法の説明を通じて、その良さを伝えられたらと思います。

※ 以下、IntelliJを例にして進めますが、JetBrains系列のIDEであれば基本的に一緒なはずですので、自身の使っているものに置き換えてお読みください。

# IdeaVimをインストール

通常のIntelliJプラグインと同じく、`[Preferences] > [Plugins]` からインストールできます。  
インストール後にIntelliJを再起動するとIdeaVimが有効になります。

![Install IdeaVim]({{ "/assets/img/posts/ideavim-introduction/install-ideavim.png" | absolute_url }})

# .ideavimrcに設定を記述

IdeaVimでは、 `.ideavimrc` というファイルに設定を記述してホームディレクトリに設置しておくことで、IntelliJ起動時にその設定を読み込んでくれます。  
`.ideavimrc` には **本家Vimの `.vimrc` と同様に、各種mapやsetなどのコマンドを記述することが可能です。**  
利用できる`set`コマンドのオプション一覧は[こちら](https://github.com/JetBrains/ideavim/blob/master/doc/set-commands.md)です。また、IdeaVim独自のオプションとして`set surround`が存在します。これを記述すると、本家Vimで言うところの[vim-surround](https://github.com/tpope/vim-surround)を一部再現した機能が使えるようになります。

自分は `.vimrc` から基本的なキーマップは切り出して`.vimrc.keymap`という独立したファイルにしておき、`.vimrc` と `.ideavimrc` それぞれから `source` コマンドを使って読み込んでいます。  
こうすることで、VimとIdeaVimで共通して設定したい基本的なキーマップを一元管理できるようになります。これは`.ideavimrc` が `.vimrc` とほとんど同じ文法で記述できるからこそのメリットですね。

参考までに自分の `.ideavimrc` と `.vimrc.keymap` を以下に載せておきます。

- [.ideavimrc](https://github.com/ikenox/dotfiles/blob/master/ideavimrc)
- [.vimrc.keymap](https://github.com/ikenox/dotfiles/blob/master/vimrc.keymap)

## IntelliJの機能をキーマッピング

上記の `.ideavimrc` を見てもらうと、 `nnoremap xxx :action yyy` という記述が多くあることがわかると思います。  
IdeaVimでは`:action`コマンドで **IntelliJの機能(Action)を呼び出して使用することができます**。  
カーソルの移動から高度な機能まで、IntelliJがAPIとして提供しているActionや、インストールしているプラグインで定義されているActionは全て呼び出せるようです。**IntelliJの強力なコードジャンプやリファクタ機能についても、Vimのキーマップ的な設定・呼び出しが可能ということになります**。  
このAction呼び出し機能により、IdeaVimとIntelliJの連携の自由度が格段に上がります。    
以下は設定しておくと幸せになれそうなActionの一例です。

|Action|概要|
:----|:----
|`SearchEverywhere`|任意のクラス・関数・ファイルを検索・ジャンプ|
|`FindInPath`|開いているプロジェクト内の任意の文字列を検索(grep的な)|
|`FileStructurePopup`|編集しているファイル内の任意の関数を検索・ジャンプ|
|`GotoDeclaration`|カーソル上の関数や変数の定義元にジャンプ|
|`FindUsages`|カーソル上の関数や変数の使用箇所一覧を表示|
|`Refactorings.QuickListPopupAction`|カーソル上の関数や変数のリファクタ(renameなど)|
|`GotoAction`|なんでも呼び出し|

#### 筆者の設定例

```
nnoremap <Space>e :action SearchEverywhere<CR>
nnoremap <Space>g :action FindInPath<CR>
nnoremap <Space>s :action FileStructurePopup<CR>
nnoremap gd :action GotoDeclaration<CR>
nnoremap U :action FindUsages<CR>
nnoremap R :action Refactorings.QuickListPopupAction<CR>
nnoremap <Space>a :action GotoAction<CR>
```

<BR>
呼び出し可能なActionの一覧は `:actionlist` コマンドで確認できます。  
また、`:actionlist hoge` と検索することで名前に`hoge`を含むActionを検索することもできます。  
自分が何らかの機能をキーマップに設定したいと思った際は、IntelliJの`[Preferences] ⇒ [Keymap]`から設定したいAction名の見当をつけた上で`:actionlist`コマンドで探すという手順を取っています。

## おわりに

本記事ではIdeaVimの機能や設定方法について説明しました。  

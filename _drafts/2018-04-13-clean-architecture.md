---
layout: post
title: CleanArchitectureとは
---

# CleanArchitecture

CleanArchitectureは、ソフトウェアのモダンな設計方針のひとつです。

### 原典のBlog記事(2012年)
[https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html](https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html)

#### 日本語訳
 [https://blog.tai2.net/the_clean_architecture.html](https://blog.tai2.net/the_clean_architecture.html)

以下、主に原典のブログ記事をもとにCleanArchitectureの自分の解釈を書いていきます。  

# CleanArchitectureの狙い

CleanArchitectureをうまく使うと、__コアとなるビジネスロジックが、それ以外の要素の影響を受けなくなります__。このことは一般に「関心の分離」と呼ばれることが多いです。  
関心がきちんと分離できていると、ソフトウェアに変更を加える際にその影響範囲が小さくなる傾向にあります。

#### 例
1. フレームワーク、ライブラリなどの影響を受けない
  - もし後から`ライブラリの差し替えやDBの差し替えをしたい`となった際にも、ビジネスロジックのコードに全く変更が不要になる
1. 永続化ストレージを
1. ビジネスロジックをUIから分離できる
  - ビジネスロジックがUIに依存しないようになるので、`webページの表示(HTML)とjsonの返却(API)で同じビジネスロジックを使える` といったことを無理なく実現できる
1. テスト可能にすなる

## CleanArchitectureのルール

CleanArchitectureでは以下の2つのルールによって、前述した「関心の分離」を実現します。

1. __ソフトウェアをいくつかのレイヤに分ける__
  - 基本は4層
    - Enterprise Business Rules
    - Application Business Rules
    - Interface Adapters
    - Frameworks & Drivers
  - 内側に行くほど抽象的・普遍的なものを扱う

1. __依存を単一方向にする( 外側 ⇒ 内側 )__
  - 内側から外側に言及してはいけない

#### クリーンアーキテクチャでググるととりあえず出てくる図

![](https://8thlight.com/blog/assets/posts/2012-08-13-the-clean-architecture/CleanArchitecture.jpg)
- DBが一番外？
- DBとUIが一緒の層？
- Entity? UseCase? Enterprise Business Rules?
- 右下の図なに？


## CleanArchitectureのメリット

- ルールが簡潔かつ抽象的
    - CleanArchitectureは実装にほとんど言及していない
    - 実際のプロジェクトに柔軟に適用しやすい
- 見通しがよくなる
    - どのクラスがどんな責務を負っているかが明確になる
    - どこに何を書けばいいかチームでの共通認識を持てる
- 業務上の関心と技術的関心の分離
    - ビジネスルールがフレームワーク、UI、DBの永続化手法、ユーザー環境などに依存しなくなる
        - webとAPIでバリデーションロジックが異なる、とかも自然と防げる
- テストしやすい
    - 疎結合になっているので、DBとかを容易にモックに差し替えてテストできる

# 各レイヤの説明

## Enterprise Business Rules (Entities)

![](https://8thlight.com/blog/assets/posts/2012-08-13-the-clean-architecture/CleanArchitecture.jpg)
> Enterprise wide business rules、Business objects of the application

- 最も抽象的・普遍的なルールや概念を記述する
  - 関数を持ったdata object(Entity)として定義される
  - アプリ(Web, API, Ope)によって変わることのない概念を定義する
    - クルマとは何か？ ⇒ オーナーがいて、モデルと年式があり、…
    - シェアとは何か？ ⇒ クルマがいて、そのクルマをシェアするドライバーがいて、開始時刻と終了時刻があり、…
  - EntityのインスタンスがDBのrowに対応することが多い(1台のクルマを表すcarオブジェクト、shareオブジェクト、…)が、必ずしもRDBのテーブルと1対1対応とは限らない
    - Entityは最も内側の層であり、外界について知らない。データソースはConfigかもしれないしcsvかもしれないしインメモリかもしれない。何にデータが保存されているかはEntityは知らなくていい
      - DB ⇔ EntityのマッピングはRepositoryの責務(後述)
      - 「DBに保存する」という処理はUseCaseの責務(後述)
    - Entityの設計がDBのテーブルスキーマに引っ張られないように気をつける
  - 最も内側の層なので、外側については何も知らない(理想)
  - Entity同士のリレーションも保持している(理想)

- 自分自身から辿れるEntity以外について言及する際は、気をつけないと責務の境界が曖昧になりそう

## Application Business Rules (Use Cases)

![](https://8thlight.com/blog/assets/posts/2012-08-13-the-clean-architecture/CleanArchitecture.jpg)
> application specific business rules

- アプリケーション特有のロジックを記述
  - 「予約リクエストの作成: 予約リクエストデータを新規作成して永続化して、オーナーにプッシュ通知を送信する。」
- AnycaではServiceと呼ばれている役割？
- UseCase層で何をしようが、データの整合性が取れなくなったりすることはないという状態が理想
- EntityやDBのテーブル名と1:1対応とは限らない
  - 単一のEntityに属すのはおかしいようなUseCaseも存在する
     - とあるユーザーがとあるクルマにリクエスト可能かどうかは様々な要因が絡んでくる
  - ほどよい感じに分割すべき？
    - ×:CarUseCase, ○:CarEditUseCase, SearchCarUseCase, ...
- フレームワークやDBがどう変わろうと、この層には影響がない

#### 例

```java
class RequestUseCase {

  ILogger logger;
  IRequestRepostiory requestRepostiory;

  void makeRequest(UserEntity driver, CarEntity car) {

    // 予約リクエストデータの新規作成
    RequestEntity request = new RequestEntity(
      car,
      driver,
      // ...
    );

    requestRepostiory.save(request); // 内側から外界に作用？

    // プッシュ通知送信
    pushNotificationUseCase.send(car.owner, "リクエストが届きました");

    logger.log("make_request", request); // 内側から外界に作用？
  }

  // ...  
}
```

# 依存関係逆転の原則

- __Dependency Inversion Principle (DIP, 依存関係逆転の原則)__
- 内側から外界に作用したい場合はInterface経由で行うことで、依存方向についてのルールを破らないようにする
    - Repositoryのインターフェースをusecaseと同じ層に作成、usecaseはそのインターフェースに依存するようにする
    - usecaseの外側の層にて、そのインターフェースを実装したrepositoryの実体を作る
    - usecaseの実行時に実体を外から渡す (Dependency Injection, DI)
        - usecase内からは実体は知らない

### UseCaseと同じ層 (インターフェース)

```java
interface IRequestRepository {
    void save(RequestEntity request);
}
```

### Interface Adapter層 (実装)

```java
class MySqlRequestRepository implements IRequestRepository {
    void save(RequestEntity request) {
        // ...
        db.execute("INSERT INTO car_data ...");
        // ...
    }
}
```

### UseCaseの呼び出し例

```java
RequestUseCase useCase = new RequestUseCase(
    new MySqlRequestRepository(),
    new FileLogger(),
    // ...
);
useCase.makeRequest(driver, car);

```

##### DIPすると

- DBとビジネスロジックが自然と疎結合に
  - UseCaseはDBについての詳しいことは知らず、「保存」「取得」といった抽象概念のみ扱えるようになる
- 必然的にDependency Injectionを使うことになる
  - テストが容易となる
  - マスタ、スレーブの切り替えをusecase外から制御できる

### Dependency Injection

```java
// 時間を操作してテストできない
class HogeUseCase {
  public boolean isExpired(){
    return expiredDate <= Ride.util.now();
  }
}
```

```java
// 特定時刻を返すような実装を用意してテストできる
interface ISystemEnvironmentRepository{
  DateTime now();
  String ipAddress();
  // ...
}

class HogeUseCase {
  ISystemEnvironmentRepository systemRepo;
  HogeUseCase(ISystemEnvironmentRepository repo){
    systemRepo = repo; // dependency injection
  }

  public boolean isExpired(){
    return expiredDate <= systemRepo.now();
  }
}
```

## Interface Adapters

![](https://8thlight.com/blog/assets/posts/2012-08-13-the-clean-architecture/CleanArchitecture.jpg)
> set of adapters that convert data from the format most convenient for the use cases and entities

- Adapterという名の通り、うまくCleanArchitectureになっていればこの層では内部と外界の表現形式(データ)の変換しか行われない
- UseCaseやEntityの世界（内部）と、外部の世界をつなぐ
- 代表的なInterface Adapter
    - コントローラー
    - Repository
    - バッチスクリプト

- この層も例に漏れず依存方向は内側のみとなるのが理想だが、この層については両方向の依存を許してもいいのでは、とする論調も一定あるっぽい
    - DIPするコストに対してリターン小さめ？
        - フレームワークやDBのドライバを差し替えることが現実どれくらい有り得るか？
    - 厳密にやった場合の例は https://qiita.com/hirotakan/items/698c1f5773a3cca6193e が参考になりそう(Go言語だけど)

### よく使われるInterface Adapter

#### コントローラー (Gateway)

```java
class CarController {
    // 妥協:外部フレームワークのContextクラスを知ってしまっている
    HttpResponse registerCar(Context c, RequestParams requestParams) {
        // リクエストパラメータ ⇒ Entityへの変換
        UserEntity driver = userRepository.get(c.userId);
        CarEntity car = carRepository.get(requestParams.get("car_id"));
        try {
            RequestEntity request = requestUseCase.makeRequest(car, driver);
            // json作成
            // 妥協:HttpResponseという外側の世界について知っている
            return HttpResponse.JSON(OK,responseJson);
        } catch (UserError error) {
            return HttpResponse.UserError(error.message);
        } //...
    }
}
```

- リクエストパラメータ中のcar_id, user_id ⇔ CarEntity, UserEntity
    - 現実的には、パラメータから値を取り出してUseCaseに渡すだけの場合も存在しそう
- 処理結果のEntity ⇔ APIレスポンス用のjson
- 処理結果のEntity ⇔ txでのレンダリング結果
- 外からのリクエストパラメータを変換してUseCaseを呼び出して、その実行結果をまた外に返す
- ContollerにてUseCaseの返り値を別のUseCaseに渡すのはアンチパターン(Controllerがビジネスロジックに言及してしまうことになる)


### Repository

- SQL文はrepositoryにしかでてこないようにする

```java

class CarRepository implements ICarRepository {
  void insert(CarEntity car) {
    // carから色々取り出してRDBにinsert
    // 妥協: 特定のDBライブラリに直接依存
    db.execute(
      "INSERT INTO car_data values (?, ?, ...)",
      newId(),
      car.model.modelId,
      car.maker.makerId,
      // ...
    );
  }

  void update(CarEntity car) {
    // ...
  }

  CarEntity get(int carId) {
    db.execute("SELECT * FROM car_data where car_id=?", carId);
  }

  List<CarEntity> search(int beginDate, int endDate, ) {
    List<Row> rows = db.execute(
      "SELECT * FROM car_data where ...",
      // ...
    );
    // List<Row> => List<CarEntity> への変換
    return cars;
  }

}

```

- 外部データ(RDBの行データ、NoSQL、csvファイル、…) ⇔ Entity の変換
  - データの取得・保存の裏側のロジックを隠し、抽象的に取得・保存を行えるようにする
- google APIから地理情報取ってくるのもrepository
- ハッシュ化や暗号化処理もRepositoryの責務

### バッチスクリプト

```java
public class WithdrawUser {
    public static void main(String[] args) {
        int userId = String.parseInt(args[0]);
        accountUseCase.withdraw(userId);
    }
}

```

## Frameworks & Drivers

![](https://8thlight.com/blog/assets/posts/2012-08-13-the-clean-architecture/CleanArchitecture.jpg)

- フレームワークや各種ライブラリ、UI、それらの最低限のwrapper(腐敗防止層？)
    - Amon2
    - Teng
    - .tx⇒htmlのレンダラー
    - bash, zshなどのshell


## 参考

- Applying The Clean Architecture to Go applications
http://manuel.kiessling.net/2012/09/28/applying-the-clean-architecture-to-go-applications/

- 持続可能な開発を目指す ~ ドメイン・ユースケース駆動（クリーンアーキテクチャ） + 単方向に制限した処理 + FRP
https://qiita.com/kondei/items/41c28674c1bfd4156186

- Clean ArchitectureでAPI Serverを構築してみる
https://qiita.com/hirotakan/items/698c1f5773a3cca6193e

- UseCaseの再利用性
http://yoskhdia.hatenablog.com/entry/2016/10/18/152624

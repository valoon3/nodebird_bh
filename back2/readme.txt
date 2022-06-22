기본 라우팅
 라우팅은 URI(또는 경로) 및 특정한 HTTP 요청 메소드(GET, POST 등)인 특정 엔드포인트에 대한 클라이언트 요청에 애플리케이션이 응답하는 방법을 결정하는 것을 말한다.
 - app.METHOD(path, handler)  // METHOD = GET || POST || PUT || DELETE
 ⌘ app 은 express 인스턴스이다.
 ⌘ handler 은 라우트가 일치할 때 실행되는 함수이다.

라우트 핸들러(handler)
 - 미들웨어와 비슷하게 작동하는 여러 콜백 함수를 제공하여 요청을 처리할 수 있습니다.
 - next 호출을 통해 콜백을 우회할 수도 있다. -> 현재 라우트를 계속할 이유가 없는 경우에는 제어를 후속 라우트에 전달할 수 있다.
 - 반드시 next 오브젝트를 지정해야한다. -> app.METHOD(path, handler, next) {

응답 메소드
 - res.download() : 파일이 다운로드되도록 프롬프트합니다.
 - res.end() : 응답 프로세스를 종료합니다.
 - res.json() : JSON 응답을 전송합니다.
 - res.jsonp() : JSONP 지원을 통해 JSON 응답을 전송합니다.
 - res.redirect() : 요청의 경로를 재지정합니다.
 - res.render() : 보기 템플리트를 렌더링합니다.
 - res.send() : 다양한 유형의 응답을 전송합니다.
 - res.sendFile() : 파일을 옥텟 스트림의 형태로 전송합니다.
 - res.sendStatus() : 응답 상태 코드를 설정한 후 해당 코드를 문자열로 표현한 내용을 응답 본문으로서 전송합니다.

미들웨어 작성
 - 미들웨어 함수는 요청 오브젝트(req), 응답 오브젝트(res), 그리고 애플리케이션의 요청-응답 주기 중 그 다음의 미들웨어 함수 대한 액세스 권한을 갖는 함수입니다.
 - 그 다음 미들웨어 함수는 일반적으로 next라는 이름의 변수로 표시된다.
 ⌘ 모든 코드를 실행
 ⌘ 현재의 미들웨어 함수가 요청-응답 주기를 종료하지 않는 경우에는 next()를 호출하여 그 다음 미들웨어 함수에 제어를 전달해야 합니다.
 ⌘ 그렇지 않으면 해당 미들웨어에서 정지해서 대기한다.

 app.get('/', (req, res, next) => {    // next: 미들웨어 함수에 대한 콜백 인수
    next();
 });

애플리케이션 레벨 미들웨어
 - 이렇게 마운트 경로가 없는 함수는 앱이 요청을 수신할 때마다 실행된다.
 app.use(function (req, res, next) {
    console.log('Time : ', Date.now());
    next();
 });

 - use : 모든 형식의 요청에 모두 실행
 - get : 모든 get 요청 처리

 - /user/:id 경로에 대한 모든 유형의 HTTP 요청에 대한 요청 정보를 console.log하는 하위 스택을 나타낸다.
 - 라우트 핸들러(next)를 이용하여 하나의 경로에 대해 여러 라우트를 정의할 수 있다.
 app.use('/user/:id', function(req, res, next) {
   console.log('Request URL:', req.originalUrl);
   next();
 }, function (req, res, next) {
   console.log('Request Type:', req.method);
   next();
 });


라우터 레벨 미들웨어
 - const router = express.Router();
 - express.Router() 인스턴스에 바인드된다는 점을 제외하면 애플리케이션 레벨 미들웨어와 동일한 방식으로 작동합니다.
 - 아래에서 애플리케이션 레벨 미들웨어에 대해 표시된 미들웨어 시스템을 라우터 레벨 미들웨어를 사용하여 복제한다.

 router.use((req, res, next) => {   // URL 이 없으므로 모든 요청에 대해서 middleware에 대해서 동작한다.
    // 서브스택 미들웨어은 /user/:id 로 들어온 요청 정보를 보여준다.
    console.log('Request URL: ', req.originalUrl);
    next();
 }, (req, res, next) => {
    console.log('Request Type:', req.method);
    next();
 });

// get 요청으로 들어온 path를 다룬다.
 router.get('/user/:id', (req, res, next) => {
    if(req.params.id == 0) next('route');
    else next();
 }, (req, res, next) => {
    res.render('regular');
 });

 //
 router.get('/user/:id', (req, res, next) => {
    console.log(req.params.id);
    res.render('special');
 });

 // 라우터를 앱에 마운트한다. -> 위에 라우터를 정의하고 정의된 라우터를 module.export 를 통해서 app에 전달해서 주로 사용된다.
 app.use('/', router);


오류 처리 미들웨어
 - 오류처리 미들웨어에는 항상 4개의 인수가 필요하다.
 - (err, req, res, next) 매개변수가 필요하다.
 app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
 });


기본 제공 미들웨어
 - express.static(root, [options]);
 - root 인수는 정적 자산의 제공을 시작하는 위치가 되는 루트 디렉토리를 지정한다.
 - 선택사항인 option 오브젝트는 다음과 같은 특성을 가진다.

 ⚛︎ dotfiles : dotfile을 제공하기위한 옵션 (allow || deny || default : ignore)
 ⚛︎ etag : etag의 생성을 사용 또는 사용 안함으로 설정 (default : true)
 ⚛︎ extensions : 파일 확장자 폴백을 설정한다. ([] 배열)
 ⚛︎ index : 디렉토리 인덱스 파일을 전송한다. 디렉토리 인덱스 작성을 하지 않으려면 false를 설정하면된다. (index.html)
 ⚛︎ lastModified : os에서 해당 파일이 마지막으로 수정된 날짜를 Last-Modified 헤더에 설정한다. (default : true, false)
 ⚛︎ maxAge : 밀리초 또는 ms형식의 문자열로 Cache-Control 헤더의 max-age 특성을 설정한다. (default : 0)
 ⚛︎ redirect : 경로 이름이 디렉토리인 경우 후미부의 '/'로 경로를 재지정한다. (default : true)
 ⚛︎ setHeaders : 파일을 제공하도록 HTTP 헤더를 설정하기 위함
 ex)
 var options = {
   dotfiles: 'ignore',
   etag: false,
   extensions: ['htm', 'html'],
   index: false,
   maxAge: '1d',
   redirect: false,
   setHeaders: function (res, path, stat) {
     res.set('x-timestamp', Date.now());
   }
 }

 app.use(express.static('public', options));

 다음과 같이, 하나의 앱은 2개 이상의 정적 디렉토리를 가질 수 있다.
 app.use(express.static('public'));
 app.use(express.static('uploads'));
 app.use(express.static('files'));


Express와 함께 템플릿 엔진을 사용
 ☀ views, 템플릿이 있는 디렉토리에 -> app.set('views', './views')
 ☀ view engine, 사용할 템플릿 엔진에 -> app.set('view engine', 'pug')

 템플릿 설정 -> app.set('view engine', 'pug');   // pug : 템플릿 엔진

 이후 views 디렉토리에 저장되어있는 index.pug 템플릿을 불러오는 법
 app.get('/', (req, res) => {
    res.render('index', {title: 'Hey', message: 'Hello there!'});
    // index 에서 템플릿 엔진이 설정되어있지 않으면 확장자를 붙여줘야 한다.
 });



오류 처리
 - 오류처리는 무조건 인수가 네개가 나와야한다.
 - app.use((err, req, res, next) => {
       console.error(err);
       res.status(500).send('Something broke!');
   });

 - 오류처리 미들웨어는 다른 app.use() 라우트 호출을 정의한 후에 마지막으로 정의해야한다.



Express 디버깅
 - Express 내부적으로 debug 모듈을 사용하여 라우트 일치, 사용 중인 미들웨어 함수, 애플리케이션 모드, 그리고 요청-응답 주기의 플로우에 대한 정보를 로그한다.

















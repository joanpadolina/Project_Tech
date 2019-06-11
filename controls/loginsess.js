









// -- Inloggen session functie -- // 
// 
// funtion signup(req, res, next){
//   function onhash(hash){
//     if(err){
//       next(err);
//     } else {
//       req.session.user = {username: username}
//       res.redirect('/');
//     }
//   }
// }
// 
// function login(req, res, next){
//   function done (err, data){
//     finction overify(match){
//       req.session.user = {username:user.username};
//       res.redirect('/')
//     } else{
//       res.status(401).send('Wachtwoord wordt niet herkend.');
//     }
//   }
// }



// 
// 
// 
// function form(req, res){
// if(req.session.user){
//   res.render('pages/feed')
// }else{
//   res.status(401).send('Login vereist.')
// }
// }
// 
// function add(req, res, next){
//   if (!req.session.user){
//     res.status(401).send('Login vereist')
//     return
//   }
// }
// 
// function signup(req, res, next){
//   function onhash(has){
//     function oninstert(err){
//       if(err){
//         next(err)
//       }else{
//         req.session.user = {username: username}
//         res.redirect('/')
//       }
//     }
//   }
// }
// 
// function login(req, res, next){
//   function done(err, data){
//     function onverify(match){
//       if(match){
//         req.session.user = {username:user.username};
//         res.redirect('/')
//       }elseP
//       res.status(401).send('Wachtwoord niet herkend')
//     }
//   }
// }



// == data accounts array == //

let accounts = [{
    id: 1,
    name: 'joan',
    age: '26',
    state: 'woman',
    email: 'joanpadolina@gmail.com',
    password: '1234',
    file: ''

  },
  {
    id: 2,
    name: 'jan',
    age: '27',
    state: 'man',
    email: 'janno@hotmail.com',
    password: '4321',
    file: ''
  },
  {
    id: 3,
    name: 'jess',
    age: '27',
    state: 'man',
    email: 'janno@hotmail.com',
    password: '4321',
    file: ''
  }
];
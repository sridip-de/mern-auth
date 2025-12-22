src/
├── assets/
│
├── components/
│   └── common/
│       ├── Buttons/
│       ├── Inputs/
│       └── Loader/
│
├── features/
│   └── auth/
│       ├── LoginForm.jsx
│       ├── SignupForm.jsx
│       ├── auth.service.js
│       └── auth.hooks.js
│
├── layout/
│   ├── Header/
│   └── Footer/
│
├── config/
│   └── axios.js
│
├── constants/
│   └── apiEndpoints.js
│
├── context/
│   └── AuthContext.js
│
├── hooks/
│   ├── mutations/
│   └── queries/
│
├── pages/
│   ├── Auth/
│   │   ├── LoginPage.jsx
│   │   └── SignupPage.jsx
│   ├── HomePage.jsx
│   └── NotFound.jsx
│
├── routes/
│   ├── AppRoutes.jsx
│   └── ProtectedRoute.jsx
│
├── App.jsx
├── main.jsx
└── index.css


✅ Summary
Folder TypeUse index.js?Reasonloaders/ (5+)✅ YesMultiple loaders imported togetherutils/ (5+)✅ YesMultiple utilities used togetherhooks/ (5+)✅ YesMultiple hooks used togetherconstants/ (5+)✅ YesMultiple constants imported togetherpages/❌ NoPages imported individuallycomponents/❌ Usually NoComponents imported individuallyservices/ (2-3)❌ NoFew services, direct import clearercontexts/❌ NoEach context is distinct

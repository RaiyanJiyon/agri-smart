# **AgriSmart – AI-Powered Farming Assistant**

![AgriSmart Banner](https://i.ibb.co/NgX0nwCz/Screenshot-186.png)

**AgriSmart** is an AI-driven agricultural assistant platform helping farmers make smarter, faster, and more sustainable farming decisions. Using cutting-edge AI, IoT, and a responsive Next.js interface, AgriSmart enables crop planning, disease detection, smart irrigation, market analysis, and expert consultation in one platform.

---

## 📖 Table of Contents

* [Features](#features)
* [Technology Stack](#technology-stack)
* [Installation](#installation)
* [Configuration (.env)](#configuration-env)
* [Usage](#usage)
* [Authentication](#authentication)
* [Routes](#routes)
* [Target Audience](#target-audience)
* [Live Demo & Repository](#live-demo--repository)

---

## ✨ Features<a id="features"></a>

### 🌾 AI-Based Crop Recommendation

* **User Input:** Soil type, weather conditions, and location
* **Output:** AI-suggested crops with yield forecasts
* **ML Models:** Trained on historical agricultural datasets

![Crop Recommendation](https://i.ibb.co/yBc7Xt7P/Screenshot-188.png) 

---

### 🌿 Plant Disease Detection (Image Processing)

* Upload plant images
* AI detects common diseases (e.g. fungus, pests)
* Offers treatments and expert links

![Disease Detection](https://i.ibb.co/Z6Ypmvx6/Screenshot-196.png) 

---

### 🌦️ AI-Powered Weather Forecasting

* Real-time localized weather updates
* Drought, rainfall, and extreme weather alerts
* Integrated with OpenWeatherMap & NOAA

![Weather Forecasting](https://i.ibb.co/Gf234HVq/Screenshot-189.png) 

---

### 🤖 AI Chatbot for Agri Support

* Ask questions on pesticides, fertilizers, market conditions
* Supports multilingual responses via NLP

![AI Chatbot](https://i.ibb.co/whsj1tBm/Screenshot-190.png)

---

### 📈 Market Price Prediction & Supply Chain Insights

* AI models analyze past price trends to predict future crop prices
* Live market integration for real-time updates

![Market Insights](https://i.ibb.co/hJ8hZf64/Screenshot-191.png)

---

### 🧑‍🌾 Community Forum & Expert Consultation

* Post queries and connect with agricultural experts
* AI summarizes and surfaces most relevant discussions

![Community Forum](https://i.ibb.co/HLQ5hVgn/Screenshot-192.png)

</br>

![Add Forum](https://i.ibb.co/CKmpW8Lj/Screenshot-193.png)

---

### 📊 Data Visualization Dashboard

* Visualize crop recommendations, weather, market trends
* Uses Recharts for rendering interactive dashboards

![Dashboard](https://i.ibb.co/TxntFC2q/Screenshot-194.png)

---

### 🌐 Multi-Language Support

* Regional language accessibility
* AI chatbot response translation

![Language Support](https://i.ibb.co/93qRfXrz/Screenshot-195.png)

---

## 🛠️ Technology Stack<a id="technology-stack"></a>

| Category           | Technologies Used                                                        |
| ------------------ | ------------------------------------------------------------------------ |
| **Frontend**       | Next.js 15, React 18, Tailwind CSS, Radix UI                             |
| **Backend**        | Node.js, Express.js                                                      |
| **Authentication** | NextAuth.js (Google, Facebook, Credentials)                              |
| **Database**       | MongoDB with Mongoose                                                    |
| **AI Integration** | @google/generative-ai |
| **Weather API**    | OpenWeatherMap, NOAA                                                     |
| **Charts**         | Recharts                                                                 |
| **Form Handling**  | React Hook Form, Zod                                                     |
| **Utilities**      | Framer Motion, Lucide React, date-fns, clsx                              |
| **Dev Tools**      | TypeScript, ESLint, Turbopack, Tailwind CSS                              |

---

## 🛠 Installation<a id="installation"></a>

### Prerequisites

* Node.js (>= 18)
* MongoDB Atlas (or local MongoDB)

### Setup Steps

```bash
git clone https://github.com/RaiyanJiyon/agri-smart
cd agri-smart
npm install
```

Run the development server:

```bash
npm run dev
```

---

## ⚙️ Configuration (.env)<a id="configuration-env"></a>

Create a `.env.local` file in the root and add the following:

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Weather API
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweather_api_key

# AI / NLP
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key

# Auth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Facebook OAuth
FACEBOOK_CLIENT_ID=your_facebook_client_id
FACEBOOK_CLIENT_SECRET=your_facebook_client_secret
```

---

## 🚀 Usage<a id="usage"></a>

1. Register or log in as a farmer
2. Get crop suggestions based on your inputs
3. Upload images to detect plant diseases
4. Check real-time weather and plan irrigation
5. Use the chatbot for expert farming advice
6. Track market prices and access visual reports

---

## 🔐 Authentication<a id="authentication"></a>

**NextAuth.js** provides authentication via:

* Email/Password
* Google OAuth
* Facebook Login

Session handling is secured with JWT.

---

## 📌 Routes<a id="routes"></a>

| Route                 | Description                     |
| --------------------- | ------------------------------- |
| `/`                   | Home dashboard                  |
| `/dashboard/user/crop-recommendation`          | Crop recommendation             |
| `/dashboard/user/disease-detector`            | Upload and analyze plant images |
| `/dashboard/user`            | Weather updates and alerts      |
| `/dashboard/user/ai-assistant`               | Chatbot interface               |
| `/dashboard/user/market-insights`             | Market trend insights           |
| `/community`              | Community discussions and Q\&A  |
| `/login`, `/register` | Auth pages                      |

---

## 🎯 Target Audience<a id="target-audience"></a>

* **Farmers and agricultural workers**
* **Agri-tech startups**
* **Government agencies and NGOs**
* **Agricultural researchers and students**

---

## 🌍 Live Demo & Repository<a id="live-demo--repository"></a>

* **Live Site:** [AgriSmart Platform](https://agri-smart-one.vercel.app/) *(placeholder)*
* **GitHub Repository:** [GitHub](https://github.com/RaiyanJiyon/agri-smart)

---

🚜 **AgriSmart** is your partner in transforming traditional farming into **smart, sustainable agriculture.** 🌱
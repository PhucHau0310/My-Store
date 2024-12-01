
# My Store E-commerce Platform
## Introduce
My Store is a modern e-commerce platform built with Next.js, designed to provide a seamless online shopping experience. The project leverages cutting-edge technologies like Prisma, Redux, Firebase, and MUI to deliver a scalable, responsive, and feature-rich application.




## Features
### Authentications
- User authentication and management using **Clerk**.

### Database Management:
- Powered by **Prisma ORM** for efficient database interactions.

### State Management:
- Global state management using **Redux Toolkit** and **Redux Persist** for session persistence.

### Real-Time Features:
- Real-time updates and notifications with Firebase.

### UI Design:
- Intuitive and responsive design using MUI (Material-UI) and TailwindCSS.

### Email Notifications:
- Transactional and user notifications via **Nodemailer**.

### Charts and Analytics:
- Display sales and user data using MUI Charts and X-Data-Grid.







## Technologies Used

**Frontend**:
- React: Component-based architecture for dynamic user interfaces.
- Next.js: Framework for server-side rendering and static site generation.
- TailwindCSS: Utility-first CSS framework for styling.
- MUI: Pre-designed components for consistent UI.
**Backend**:
- Prisma: ORM for database interactions.
- Firebase: For notifications and real-time updates.
- Nodemailer: For email notifications.
**State Management**:
- Redux Toolkit: For state management.
- Redux Persist: For persisting the state across sessions.
**Development Tools**:
- Typescript: For type safety and better development experience.
- Vercel: For deploying the application.

## Installation

### 1. Clone the repository:
```bash
  git clone https://github.com/your-username/my-store.git  
  cd my-store  
```

### 2. Install dependencies:
```bash
  npm Install 
```

### 3. Set up environment variables:
Create a .env file and add the following variables:
```bash
  DATABASE_URL=your-database-url  
  NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key  
  NEXT_PUBLIC_CLERK_FRONTEND_API=your-clerk-frontend-api  
  CLERK_API_KEY=your-clerk-backend-api-key  
```

### 4. Set up the database:
```bash
  npx prisma generate  
  npx prisma migrate deploy  
```

### 5. Run the development:
```bash
  npm run dev  
```

### 6. Build for production:
```bash
  npm run build
```

## Deployment
This project is optimized for deployment on Vercel. Ensure the environment variables are properly configured in the Vercel dashboard before deployment.


## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


## Contact

- Name: Nguyễn Phúc Hậu
- Email: haunhpr024@gmail.com


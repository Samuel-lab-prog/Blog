#  Blog Application (Frontend)
This repository contains the entire **Frontend** for the **Blog Application** project.
##  Technologies Used
- **TypeScript** — main programming language  
- **React** — chosen javascript framwwork  
- **TailwindCSS** — chosen CSS framework
- **Vite** - chosen bundler  
##  Main Dependencies
- **React** — library for building UI components  
- **React Router DOM** — for routing and page navigation  
- **React Hook Form** — for managing form state  
- **Zod** — for schema validation and type-safe form validation  
- **Framer Motion** — for smooth animations and transitions  
- **Marked** — for parsing Markdown content into HTML  
- **React Responsive** — for responsive design hooks  
- **Tailwind CSS (via Vite)** — for utility-first CSS styling  
- **@hookform/resolvers** — integrates Zod with React Hook Form  

##  How to Run Locally
### 1.Clone the repository
```
git clone https://github.com/yourusername/blog.git
cd blog
```
### 2.Install dependencies
```
npm install
```
### 3.Run the local development server
```
npm run dev
```
## Good practices and code style
This project follows several standards and patterns to ensure clean, maintainable, and scalable code — making it easier for anyone to contribute and understand.
### Commits patterns
 1. Use a prefix for every commit. Commomn prefixes include:
   - feat: → for new features
   - fix: → for bug fixes
   - refactor: → for code restructuring without changing functionality
   - docs: → for documentation changes
   - style: → for formatting or code style adjustments
 2. Keep commits focused: Each commit should address only one clear purpose.
     Avoid large, mixed commits — instead, split them into smaller, well-defined ones.
 3. Write meaningful commit messages:
     **Bad:** fix stuff
     **Good:** fix: resolve user authentication token validation issue
### Coding patterns
1. **Always** use the command ```npm run format``` to format your code before commiting. This ensures consistent code style across the entire project.
2. Keep logic where it belongs. There **shouldn't** be a component on a the hooks folder.
3. Write error proof code. Assume that anything that can fail will fail.
   Use try/catch blocks when dealing with asynchronous code or external resources like API calls.
4. Avoid unecesseary variables. If a value is only used once or is easily readable inline, don’t assign it to a variable.
5. Keep functions small and focused: Each function should do one thing well.
   If a function is getting too long or has multiple responsibilities, break it into smaller helper functions.






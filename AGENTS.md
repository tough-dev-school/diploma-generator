# Agent Guidelines for diploma-generator

This project generates PNG out of SVG files in the templates folder. SVGs are jinja2 templates. `index.js` extrolates template variables using GET-parameters. Each template is language-specific, for russian we use suffix `-ru` and for english -- `-en`.



## Build/Lint/Test Commands

- `npm run dev` - Start development server with nodemon (watches js,svg files)
- `npm run lint` - Run ESLint on all JS files
- No test command configured (returns error)
- `npm ci` - Install dependencies (preferred over npm install)

## Code Style Guidelines

- ESLint config: airbnb-base + prettier
- Node.js environment, CommonJS modules (require/module.exports)
- No default exports allowed (`import/no-default-export: error`)
- Console/debugger allowed in development, error in production
- Consistent camelCase naming for variables and functions
- Use `const`/`let` appropriately, avoid `var`
- Async/await preferred, require-await enforced
- Destructuring in function parameters: `const { template } = req.params`
- Double quotes for strings, semicolons required

## Error Handling

- Try/catch for async operations with proper error responses
- Return early from functions on error conditions
- Use appropriate HTTP status codes (400, 401, 500)
- Sentry integration for error tracking


## Template variables
- In russian we use gender-specific suffixes, based on the variable named `sex`.
- The parameter `name` if cross-language.
- In russian we use `date_ru` or `date_ru_1`/`date_ru_2` for course dates
- In english we use `date_en` or `date_en_1`/`date_en_2` for course dates

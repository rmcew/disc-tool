# Disc Assessment Tool

![Disc Assessment Tool]

The **Disc Assessment Tool** is a powerful and flexible tool designed to facilitate taking a DISC assessment in multiple languages. The tool allows users to complete the assessment in their preferred language, making it accessible to a wider audience.

## Features

- **Multi-Language Support**: The tool supports a variety of languages. Language sets can be found in the `static/languages` directory. Each language is represented by a folder named with its language code (e.g., `en` for English, `ru` for Russian).

- **Easy Language Addition**: To add a new language, simply create a new folder in the `static/languages` directory with the appropriate language code and fill out each file that is present in other languages. Additionally, remember to update the new language code in the JSON object located at `static/languages/list.json`.

## Getting Started

Follow these steps to get started with the Disc Assessment Tool:

1. Clone the repository:
   ```bash
   git clone https://github.com/rmcew/disc-tool.git
   ```

2. Navigate to the project directory:
   ```bash
   cd disc-assessment-tool
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Access the tool in your browser at `http://localhost:5179` and start taking the Disc assessment in your preferred language!

## Adding a New Language

To add a new language to the Disc Assessment Tool, follow these steps:

1. Create a new folder in `static/languages` with the language code (e.g., `fr` for French).

2. Fill out each file in the new folder that corresponds to the files present in other language folders.

3. Update the `static/languages/list.json` file by adding the new language code to the JSON object.

4. Restart the development server to see the new language option in the tool.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or a pull request in this repository.

## License

This project is licensed under the [MIT License](LICENSE).

---

We hope you find the **Disc Assessment Tool** helpful for providing an accessible way for users to take the DISC assessment in their preferred language. If you have any questions or need assistance, please don't hesitate to reach out to us or open an issue in this repository.
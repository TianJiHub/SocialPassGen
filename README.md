# Social Engineering Password Generator (SocialPassGen)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Language](https://img.shields.io/badge/language-JavaScript-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

**English** | [中文](README_CN.md)

## Project Overview

The Social Engineering Password Generator is a password dictionary generation tool based on social engineering principles. By collecting publicly available information about targets (such as names, birthdays, hobbies, etc.), it intelligently generates highly relevant password lists for cybersecurity testing and research.

This tool helps security researchers and penetration testers create customized password dictionaries based on target personal information, improving the success rate of password cracking.

## Key Features

- **Multi-dimensional Information Collection**: Supports collecting various personal information such as names, birthdays, ID numbers, phone numbers, social accounts, etc.
- **Intelligent Password Generation**: Generates possible password combinations using multiple patterns and algorithms based on collected information
- **Flexible Length Control**: Set minimum and maximum password lengths to generate passwords within specified ranges
- **Case Handling**: Supports multiple case formats (capitalize first letter, uppercase, lowercase, keep original format)
- **Multiple Export Formats**: Supports exporting generated passwords in TXT, CSV, JSON, Excel and other formats
- **Responsive Design**: Supports access on desktop and mobile devices

## How to Use

1. Open the `index.html` file in your browser
2. Fill in the target's relevant information:
   - Names (Chinese pinyin/English)
   - Birthdays (solar/lunar)
   - ID numbers, phone numbers, QQ numbers, WeChat IDs
   - Email, common phrases, online nicknames
   - Organization/company information, other related information
3. Set password length range (minimum and maximum length)
4. Choose case handling method
5. Click the "Generate Password List" button
6. View the generated password list
7. Export the password dictionary in your preferred format

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **No Backend Required**: Pure frontend implementation with all calculations done in the browser
- **Responsive Design**: Adapts to devices with different screen sizes

## Installation and Deployment

```bash
# Clone the project
git clone https://github.com/TianJiHub/SocialPassGen.git

# Navigate to the project directory
cd SocialPassGen

# Use your browser Open the index.html file
```

## Security Statement

This tool is intended solely for legitimate security testing and research purposes. Users must ensure compliance with relevant laws and regulations when using this tool, and should only test target systems with explicit authorization.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Issues and Pull Requests are welcome to improve this project.

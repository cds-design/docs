# Typography

Typography is the art and technique of arranging type on a website. It is not only about the design or composition of the letters and characters and their arrangement, but also about communication, visual identity, brand persona, usability, and much more.

Typography plays a crucial role in web design and development because it:

- Creates a strong visual hierarchy, providing a graphic balance to the website and guiding users through the user interface
- Enhances the readability and accessibility of the text, making it easier for users to scan, understand, and consume the information
- Sets the tone and mood for the website, conveying the personality and emotion of the brand and the message
- Boosts the SEO and ranking of the website, using keywords, meta tags, headings, links, images, and other elements to make the website relevant and useful for the target audience

## Fonts

Fonts are sets of typefaces that share common design features. Fonts can have different styles, such as regular, bold, italic, or condensed. Fonts can also belong to different categories or families, such as serif, sans serif, script, or display.

Fonts are important in web design and development because they:

- Affect the legibility and readability of the text, depending on their size, weight, spacing, and contrast
- Influence the user’s perception and impression of the website, depending on their style, mood, and association
- Reflect the brand identity and voice of the website, depending on their personality, character, and expression

Some of the font properties that web designers and developers can use to manipulate fonts are:

- `font-family{:css}`: Specifies the font or font stack to be used for an element
- `letter-spacing{:css}`: Adjusts the space between individual letters in a word
- `word-spacing{:css}`: Adjusts the space between individual words in a sentence

## Hierarchy

Hierarchy is the arrangement of elements in order of importance or relevance. Hierarchy helps users to understand the structure and organization of the content on a website. Hierarchy also helps users to navigate and interact with the website.

Hierarchy is important in web design and development because it:

- Improves the user experience and satisfaction by providing clarity, consistency, and coherence
- Enhances the visual appeal and aesthetics of the website by creating contrast, balance, and harmony
- Reinforces the message and purpose of the website by emphasizing the key points and actions

Some of the font properties that web designers and developers can use to create hierarchy are:

- `font-weight{:css}`: Specifies how bold or thin a font should be
- `line-height{:css}`: Specifies how tall or short a line of text should be
- `font-size{:css}`: Specifies how large or small a font should be

## Typography for Developers

Developers can learn more about Typography [@CSS Tricks](https://css-tricks.com/typography-for-developers/) technically.

## System Fonts in CSS

System fonts are fonts that are installed on the user’s device or operating system. System fonts can be used in CSS by using the font-family property and specifying the name of the font or a generic font family.

System fonts are advantageous in web design and development because they:

- Improve the loading speed and performance of the website by avoiding external font requests
- Enhance the user experience and satisfaction by using familiar and consistent fonts
- Increase the compatibility and accessibility of the website by using fonts that support different languages and scripts

System fonts can be used in CSS by using a system font stack, which is a list of fonts that fall back to each other in case the first one is not available. For example, this is a system font stack that uses the default system font for different operating systems:

```css filename="Example for System Font Stack" copy
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans,
  Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
```

System fonts can be a good option for web design and development when you want to use simple and standard fonts that match the user’s device or operating system. Learn more about system fonts in CSS [@CSS Tricks](https://css-tricks.com/snippets/css/system-font-stack/)

---
# Twin Cities Animal Rescue — Sophia Web Development project

Four-page semantic HTML website, extended with a mobile-first external stylesheet for Touchstone 3.

## Files
- index.html — mission, ways to help, responsive picture
- services.html — adoption, fostering, volunteering
- about.html — story, values, partners, video with fallback
- contact.html — accessible labeled inquiry form (demonstration only)
- styles.css — consistent color palette, Flexbox, responsive breakpoints
- assets/ — original media supplied in Sophia Animal Rescue ZIP

## Preview
Open index.html in a browser or use a local preview in GitHub Codespaces. Internal navigation uses relative links.

## Important before submission
This is a recreated project rather than the user's original Touchstone 2 submission. Review, personalize, and test it against the Sophia rubric. The inquiry form is intentionally not functional because there is no server endpoint. No unverified statistics, partners, or office hours have been fabricated. To finish Touchstone 3, publish the project in a public GitHub repository, capture a real preview screenshot, and enter the actual repository/preview URLs in the Sophia template.

## Touchstone 4 additions
- `services.html`: interactive help selector with a dynamically updated recommendation.
- `contact.html`: JavaScript checks name, email, interest and message with inline errors. The demo never sends contact information.
- `script.js`: organized functions, a help-options array and two configuration objects; localStorage remembers only the help category.

### Testing and screenshots
1. Open Services, select Fostering, and capture the recommendation (Screenshot 1).
2. Open Contact, leave required fields blank, click Review my interest, and capture the error messages (Screenshot 2).
3. Return to Services, refresh, and capture the restored Fostering choice (Screenshot 3).
4. Test all links and mobile view before submitting.

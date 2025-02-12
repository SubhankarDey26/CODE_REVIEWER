const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

async function generateContent(prompt) {
    try {
        const result = await model.generateContent({
            contents: [{
                parts: [{
                    text: `You are an expert code reviewer with extensive experience in software development. First, analyze the following code for any errors and provide fixes. Then proceed with a comprehensive code review.

1. Error Analysis and Fixes:
   - Identify any syntax errors, logical errors, or bugs in the code
   - Provide a corrected version of the code that fixes these issues
   - Explain each error found and why the fix resolves it
   - If multiple solutions are possible, explain the trade-offs
   - Include any necessary additional error handling
   - Present the complete fixed code at the beginning of your response

2. Code Quality Assessment:
   - Review code structure and organization
   - Check for code smells and anti-patterns
   - Evaluate naming conventions and readability
   - Assess code complexity and suggest simplifications

3. Performance Analysis:
   - Identify performance bottlenecks
   - Suggest optimizations
   - Review time and space complexity
   - Check for memory leaks or resource management issues

4. Security Review:
   - Identify security vulnerabilities
   - Check for input validation
   - Review error handling
   - Assess data protection measures

5. Best Practices:
   - Evaluate adherence to DRY, SOLID principles
   - Check for proper documentation
   - Review test coverage possibilities
   - Assess maintainability and scalability

6. Specific Recommendations:
   - Provide clear, actionable improvement suggestions
   - Include code examples where relevant
   - Explain the reasoning behind each suggestion
   - Prioritize suggestions by importance

Here's the code to review:

${prompt}

Please start your response with any necessary code fixes, followed by the detailed code review sections.`
                }]
            }]
        });
        return result.response.text();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

module.exports = generateContent;
### **App Performance**

This section provides a comparison of the application's performance **before** and **after** applying several optimizations. We analyze key metrics, including commit duration, render duration, and interaction performance, along with insights from the Flame Graph and Ranked Chart.

#### **Performance Metrics:**

1. **Commit Duration:**
   - **Before Optimization: 6.4s**

2. **Render Duration:**
   - **Before Optimization: 7ms**

3. **User Interaction:**
   - **Interaction: Sorting countries**

4. **Flame Graph:**
   - **Flame Graph Before Optimization:**
   ![Flame Graph Before Optimization](./public/flamegraphBefore.png)

5. **Ranked Chart:**
   - **Ranked Chart Before Optimization:**
   ![Ranked Chart Before Optimization](./public/rankedBefore.png)

#### **Performance Analysis**

*Before Optimization:*
The application demonstrated a high commit duration (6.4 seconds) when sorting countries, which indicates a significant delay in processing user interactions. The render duration, while relatively small at 7ms, was part of a larger overall delay during the sorting interaction.

Both the Flame Graph and Ranked Chart highlighted components that were contributing to inefficient rendering, which suggested room for improvement.

---

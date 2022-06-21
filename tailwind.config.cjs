module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      keyframes: {
        "scale-up": {
          "O%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
      },
      animation: {
        "scale-up": "scale-up 0.1s ease-in-out forwards",
      },
    },
  },
  plugins: [],
}

import tkinter as tk
from tkinter import messagebox


class Calculator(tk.Tk):
    def __init__(self):
        super().__init__()

        self.title("Basic Calculator")
        self.geometry("300x400")

        self.history = []

        self.create_widgets()

    def create_widgets(self):
        self.display = tk.Entry(self, width=20, bd=5)
        self.display.grid(row=0, column=0, columnspan=4)

        self.create_buttons()

        self.history_button = tk.Button(self, text="History", command=self.show_history)
        self.history_button.grid(row=5, column=0, columnspan=4)

        self.clear_history_button = tk.Button(
            self, text="Clear History", command=self.clear_history
        )
        self.clear_history_button.grid(row=6, column=0, columnspan=4)

    def create_buttons(self):
        self.buttons = []

        for i in range(1, 10):
            button = tk.Button(
                self, text=i, command=lambda x=i: self.display.insert(tk.END, x)
            )
            button.grid(row=i + 1, column=0)
            self.buttons.append(button)

        self.add_button = tk.Button(self, text="+", command=self.add)
        self.add_button.grid(row=1, column=3)

        self.subtract_button = tk.Button(self, text="-", command=self.subtract)
        self.subtract_button.grid(row=2, column=3)

        self.multiply_button = tk.Button(self, text="*", command=self.multiply)
        self.multiply_button.grid(row=3, column=3)

        self.divide_button = tk.Button(self, text="/", command=self.divide)
        self.divide_button.grid(row=4, column=3)

        self.equal_button = tk.Button(self, text="=", command=self.equals)
        self.equal_button.grid(row=5, column=3)

        self.zero_button = tk.Button(
            self, text="0", command=lambda: self.display.insert(tk.END, "0")
        )
        self.zero_button.grid(row=6, column=0)

        self.period_button = tk.Button(
            self, text=".", command=lambda: self.display.insert(tk.END, ".")
        )
        self.period_button.grid(row=6, column=1)

        self.clear_button = tk.Button(self, text="C", command=self.clear)
        self.clear_button.grid(row=6, column=2)

    def add(self):
        self.add_value = float(self.display.get())
        self.result = None
        self.history.append(f"{self.add_value} +")
        self.display.delete(0, tk.END)

    def subtract(self):
        self.subtract_value = float(self.display.get())
        self.result = None
        self.history.append(f"{self.subtract_value} -")
        self.display.delete(0, tk.END)

    def multiply(self):
        self.multiply_value = float(self.display.get())
        self.result = None
        self.history.append(f"{self.multiply_value} *")
        self.display.delete(0, tk.END)

    def divide(self):
        self.divide_value = float(self.display.get())
        self.result = None
        self.history.append(f"{self.divide_value} /")
        self.display.delete(0, tk.END)

    def equals(self):
        if self.result is None:
            if self.add_value is not None:
                self.result = self.add_value + self.divide_value
                self.history.append(f"{self.divide_value} / = {self.result}")
            elif self.subtract_value is not None:
                self.result = self.subtract_value - self.multiply_value
                self.history.append(f"{self.multiply_value} * = {self.result}")
            elif self.multiply_value is not None:
                self.result = self.multiply_value * self.add_value
                self.history.append(f"{self.add_value} + = {self.result}")
            elif self.divide_value is not None:
                if self.add_value == 0:
                    messagebox.showerror("Error", "Cannot divide by zero")
                    self.display.delete(0, tk.END)
                    return
                self.result = self.divide_value / self.add_value
                self.history.append(f"{self.add_value} / = {self.result}")

        self.display.delete(0, tk.END)
        self.display.insert(tk.END, self.result)

    def clear(self):
        self.display.delete(0, tk.END)
        self.add_value = None
        self.subtract_value = None
        self.multiply_value = None
        self.divide_value = None
        self.result = None
        self.history.clear()

    def show_history(self):
        history_string = "\n".join(self.history)
        messagebox.showinfo("History", history_string)

    def clear_history(self):
        self.history.clear()


if __name__ == "__main__":
    app = Calculator()
    app.mainloop()

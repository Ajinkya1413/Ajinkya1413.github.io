// Game Variables
// Game Variables
const codeSnippets = [
    {
        code: `import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
import numpy as np

# Generate dummy data
x_train = np.random.random((1000, 20))
y_train = keras.utils.to_categorical(np.random.randint(10, size=(1000, 1)), num_classes=10)
x_test = np.random.random((200, 20))
y_test = keras.utils.to_categorical(np.random.randint(10, size=(200, 1)), num_classes=10)

# Build a simple model
model = keras.Sequential([
    layers.Dense(64, activation='relu', input_shape=(20,)),
    layers.Dense(64, activation='relu'),
    layers.Dense(10, activation='softmax')
])

# Compile model
model.compile(optimizer='adam',
              loss='categorical_crossentropy',
              metrics=['accuracy'])

# Train model
model.fit(x_train, y_train, epochs=10, batch_size=32, validation_data=(x_test, y_test))

# Evaluate model
loss, acc = model.evaluate(x_test, y_test, verbose=0)
print(f"Test Accuracy: {acc:.4f}")`,
        tags: ["Python", "TensorFlow", "Machine Learning Model", "AI/ML", "Data Pipeline"],
        link: "https://github.com/keras-team/keras/blob/master/examples/mnist_mlp.py",
        lnum: "10-63"
    },
    {
        code: String.raw`
          def fit(self,
        x=None,
        y=None,
        batch_size=None,
        epochs=1,
        verbose=1,
        callbacks=None,
        validation_split=0.0,
        validation_data=None,
        shuffle=True,
        class_weight=None,
        sample_weight=None,
        initial_epoch=0,
        steps_per_epoch=None,
        validation_steps=None,
        validation_batch_size=None,
        validation_freq=1,
        max_queue_size=10,
        workers=1,
        use_multiprocessing=False):
    """Trains the model for a fixed number of epochs (iterations on a dataset).

    Arguments:
        x: Input data. It could be:
            - A Numpy array (or array-like), or a list of arrays (in case the
              model has multiple inputs).
            - A TensorFlow tensor, or a list of tensors (in case the model
              has multiple inputs).
            - A dict mapping input names to the corresponding array/tensors,
              if the model has named inputs.
            instance (e.g. list, tuple, etc.).
            If an integer,
::contentReference[oaicite:0]{index=0}`
              ,
        tags: ["Python", "TensorFlow", "AI/ML", "SaaS"]
    },
    {
        code: `#include <SFML/Graphics.hpp>
    
    int main() {
        sf::RenderWindow window(sf::VideoMode(800, 600), "SFML Game");
    
        sf::CircleShape shape(50);
        shape.setFillColor(sf::Color::Green);
        shape.setPosition(375, 275);
    
        while (window.isOpen()) {
            sf::Event event;
            while (window.pollEvent(event)) {
                if (event.type == sf::Event::Closed)
                    window.close();
            }
    
            window.clear();
            window.draw(shape);
            window.display();
        }
    
        return 0;
    }`,
        tags: ["C++", "SFML", "Game Development", "Graphics", "Gaming"],
        link: "https://github.com/SFML/SFML/blob/master/examples/window.cpp",
        lnum: "3-27"
    },
    {
        "code": "using System;\nusing System.Linq;\n\nclass Program\n{\n    static void Main()\n    {\n        int[] numbers = { 5, 10, 8, 3, 6, 12 };\n        var numQuery = from num in numbers\n                       where num % 2 == 0\n                       orderby num\n                       select num;\n        foreach (int num in numQuery)\n        {\n            Console.WriteLine(num);\n        }\n    }\n}",
        "tags": ["C#", "LINQ", "Arrays", "Query"],
        "link": "https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/linq/basic-linq-query-operations",
        "lnum": "1-16"
    },
    {
        "code": "const http = require('http');\n\nconst hostname = '127.0.0.1';\nconst port = 3000;\n\nconst server = http.createServer((req, res) => {\n  res.statusCode = 200;\n  res.setHeader('Content-Type', 'text/plain');\n  res.end('Hello, World!');\n});\n\nserver.listen(port, hostname, () => {\n  console.log(`Server running at http://${hostname}:${port}/`);\n});",
        "tags": ["JavaScript", "Node.js", "HTTP Server", "Networking"],
        "link": "https://nodejs.org/en/docs/guides/getting-started-guide/",
        "lnum": "1-12"
    },
    {
        "code": "import socket\nimport os\nimport sys\nimport time\nimport threading\nfrom queue import Queue\n\n# Number of threads\nN_THREADS = 200\n\n# Thread queue\nq = Queue()\n\n# List of common ports to scan\ncommon_ports = [21, 22, 23, 25, 53, 80, 110, 111, 135, 139, 143, 443, 445, 993, 995, 1723, 3306, 3389, 5900, 8080]\n\n# Lock for thread-safe printing\nprint_lock = threading.Lock()\n\n# Function to scan a single port\ndef port_scan(port):\n    try:\n        s = socket.socket()\n        s.settimeout(1)\n        s.connect((target, port))\n    except:\n        with print_lock:\n            print(f\"Port {port}: Closed\")\n    else:\n        with print_lock:\n            print(f\"Port {port}: Open\")\n    finally:\n        s.close()\n\n# Worker function to get port from queue and scan it\ndef worker():\n    while True:\n        port = q.get()\n        port_scan(port)\n        q.task_done()\n\n# Main function\nif __name__ == \"__main__\":\n    if len(sys.argv) != 2:\n        print(\"Usage: python3 scanner.py <target>\")\n        sys.exit(1)\n\n    target = sys.argv[1]\n\n    # Start threads\n    for t in range(N_THREADS):\n        t = threading.Thread(target=worker)\n        t.daemon = True\n        t.start()\n\n    # Put ports into queue\n    for port in common_ports:\n        q.put(port)\n\n    # Wait for queue to be empty\n    q.join()\n\n    print(\"Scan complete.\")",
        "tags": ["Python", "Network Security", "Port Scanning", "Threading"],
        "link": "https://github.com/your-repo/network-scanner/blob/main/scanner.py",
        "lnum": "1-50"
    },
    {
        "code": "#include <pcap.h>\n#include <stdio.h>\n#include <arpa/inet.h>\n#include <netinet/ip.h>\n#include <netinet/if_ether.h>\n\nvoid process_packet(u_char *, const struct pcap_pkthdr *, const u_char *);\n\nint main(int argc, char *argv[])\n{\n    pcap_if_t *alldevs, *device;\n    pcap_t *handle;\n    char errbuf[PCAP_ERRBUF_SIZE];\n\n    // Find all available devices\n    if (pcap_findalldevs(&alldevs, errbuf) == -1)\n    {\n        fprintf(stderr, \"Error finding devices: %s\\n\", errbuf);\n        return 1;\n    }\n\n    // Use the first available device\n    device = alldevs;\n\n    // Open the device for packet capture\n    handle = pcap_open_live(device->name, BUFSIZ, 1, 1000, errbuf);\n    if (handle == NULL)\n    {\n        fprintf(stderr, \"Could not open device %s: %s\\n\", device->name, errbuf);\n        return 1;\n    }\n\n    // Start packet processing loop\n    pcap_loop(handle, 0, process_packet, NULL);\n\n    // Close the handle\n    pcap_close(handle);\n\n    return 0;\n}\n\nvoid process_packet(u_char *args, const struct pcap_pkthdr *header, const u_char *buffer)\n{\n    struct ethhdr *eth = (struct ethhdr *)buffer;\n    struct iphdr *ip = (struct iphdr *)(buffer + sizeof(struct ethhdr));\n\n    printf(\"Ethernet Header\\n\");\n    printf(\"   |-Source Address      : %02X-%02X-%02X-%02X-%02X-%02X \\n\", eth->h_source[0], eth->h_source[1], eth->h_source[2], eth->h_source[3], eth->h_source[4], eth->h_source[5]);\n    printf(\"   |-Destination Address : %02X-%02X-%02X-%02X-%02X-%02X \\n\", eth->h_dest[0], eth->h_dest[1], eth->h_dest[2], eth->h_dest[3], eth->h_dest[4], eth->h_dest[5]);\n\n    printf(\"IP Header\\n\");\n    printf(\"   |-Source IP        : %s\\n\", inet_ntoa(*(struct in_addr *)&ip->saddr));\n    printf(\"   |-Destination IP   : %s\\n\", inet_ntoa(*(struct in_addr *)&ip->daddr));\n}",
        "tags": ["C", "Network Security", "Packet Sniffing", "Libpcap"],
        "link": "https://github.com/your-repo/packet-sniffer/blob/main/sniffer.c",
        "lnum": "1-50"
    },
    
    {
        code: `package main
    
    import (
        "fmt"
        "net/http"
    )
    
    func handler(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Hello, World!")
    }
    
    func main() {
        http.HandleFunc("/", handler)
        fmt.Println("Server running on port 8080")
        http.ListenAndServe(":8080", nil)
    }`,
        tags: ["Go", "Backend", "API", "Cloud Computing", "Web Server"],
        link: "https://github.com/golang/go/blob/master/src/net/http/server.go",
        lnum: "5-19"
    },
    {
        code: `
        package com.example.demo;
    
        import org.springframework.boot.SpringApplication;
        import org.springframework.boot.autoconfigure.SpringBootApplication;
        import org.springframework.web.bind.annotation.GetMapping;
        import org.springframework.web.bind.annotation.PathVariable;
        import org.springframework.web.bind.annotation.PostMapping;
        import org.springframework.web.bind.annotation.RequestBody;
        import org.springframework.web.bind.annotation.RestController;
        import java.util.ArrayList;
        import java.util.List;
        import java.util.Optional;
    
        @SpringBootApplication
        public class DemoApplication {
            public static void main(String[] args) {
                SpringApplication.run(DemoApplication.class, args);
            }
        }
    
        @RestController
        class UserController {
            private List<User> users = new ArrayList<>();
    
            @GetMapping("/users")
            public List<User> getAllUsers() {
                return users;
            }
    
            @GetMapping("/users/{id}")
            public User getUserById(@PathVariable int id) {
                Optional<User> user = users.stream().filter(u -> u.getId() == id).findFirst();
                return user.orElse(null);
            }
    
            @PostMapping("/users")
            public User createUser(@RequestBody User user) {
                users.add(user);
                return user;
            }
        }
    
        class User {
            private int id;
            private String name;
            private String email;
    
            // Constructors
            public User() {}
    
            public User(int id, String name, String email) {
                this.id = id;
                this.name = name;
                this.email = email;
            }
    
            // Getters and Setters
            public int getId() {
                return id;
            }
    
            public void setId(int id) {
                this.id = id;
            }
    
            public String getName() {
                return name;
            }
    
            public void setName(String name) {
                this.name = name;
            }
    
            public String getEmail() {
                return email;
            }
    
            public void setEmail(String email) {
                this.email = email;
            }
        }
        `,
        tags: ["Java", "Spring Boot", "REST API", "Backend", "Web Development"],
        link: "https://github.com/spring-projects/spring-boot/blob/main/spring-boot-samples/spring-boot-sample-web/src/main/java/com/example/springboot/DemoApplication.java",
        lnum: "1"
    },
    {
        code: `
        #include <QApplication>
        #include <QWidget>
        #include <QPushButton>
        #include <QVBoxLayout>
        #include <QLabel>
        #include <QLineEdit>
        #include <QTextEdit>
    
        class SimpleForm : public QWidget {
        public:
            SimpleForm(QWidget *parent = nullptr);
    
        private:
            QLineEdit *nameEdit;
            QLineEdit *emailEdit;
            QTextEdit *addressEdit;
        };
    
        SimpleForm::SimpleForm(QWidget *parent) : QWidget(parent) {
            QVBoxLayout *layout = new QVBoxLayout(this);
    
            QLabel *nameLabel = new QLabel("Name:", this);
            nameEdit = new QLineEdit(this);
    
            QLabel *emailLabel = new QLabel("Email:", this);
            emailEdit = new QLineEdit(this);
    
            QLabel *addressLabel = new QLabel("Address:", this);
            addressEdit = new QTextEdit(this);
    
            QPushButton *submitButton = new QPushButton("Submit", this);
    
            layout->addWidget(nameLabel);
            layout->addWidget(nameEdit);
            layout->addWidget(emailLabel);
            layout->addWidget(emailEdit);
            layout->addWidget(addressLabel);
            layout->addWidget(addressEdit);
            layout->addWidget(submitButton);
    
            setLayout(layout);
            setWindowTitle("Simple Form");
        }
    
        int main(int argc, char *argv[]) {
            QApplication app(argc, argv);
    
            SimpleForm form;
            form.show();
    
            return app.exec();
        }
        `,
        tags: ["C++", "Qt", "GUI", "Desktop Application", "Frontend"],
        link: "https://github.com/qt/qtbase/blob/dev/examples/widgets/widgets/mainwindows/mdi/mdi.cpp",
        lnum: "1"
    },
    {
        code: `
        import React, { useState } from 'react';
    
        function TodoApp() {
            const [todos, setTodos] = useState([]);
            const [newTodo, setNewTodo] = useState('');
    
            const addTodo = () => {
                if (newTodo.trim() !== '') {
                    setTodos([...todos, { text: newTodo, completed: false }]);
                    setNewTodo('');
                }
            };
    
            const toggleTodo = (index) => {
                const updatedTodos = todos.map((todo, i) => 
                    i === index ? { ...todo, completed: !todo.completed } : todo
                );
                setTodos(updatedTodos);
            };
    
            const deleteTodo = (index) => {
                const updatedTodos = todos.filter((_, i) => i !== index);
                setTodos(updatedTodos);
            };
    
            return (
                <div>
                    <h1>Todo List</h1>
                    <input
                        type="text"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        placeholder="Add a new todo"
                    />
                    <button onClick={addTodo}>Add</button>
                    <ul>
                        {todos.map((todo, index) => (
                            <li key={index} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                                {todo.text}
                                <button onClick={() => toggleTodo(index)}>
                                    {todo.completed ? 'Undo' : 'Complete'}
                                </button>
                                <button onClick={() => deleteTodo(index)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
    
        export default TodoApp;
        `,
        tags: ["JavaScript", "React", "Frontend", "Web Development", "UI"],
        link: "https://github.com/facebook/react/blob/main/examples/todomvc/src/components/TodoApp.js",
        lnum: "1"
    },
    
    {
        code: `
        -- Create Customers table
        CREATE TABLE Customers (
            CustomerID INT PRIMARY KEY,
            FirstName VARCHAR(50),
            LastName VARCHAR(50),
            Email VARCHAR(100),
            PasswordHash VARBINARY(64),
            DateOfBirth DATE,
            CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    
        -- Create Products table
        CREATE TABLE Products (
            ProductID INT PRIMARY KEY,
            ProductName VARCHAR(100),
            Description TEXT,
            Price DECIMAL(10, 2),
            StockQuantity INT,
            CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    
        -- Create Orders table
        CREATE TABLE Orders (
            OrderID INT PRIMARY KEY,
            CustomerID INT,
            OrderDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            TotalAmount DECIMAL(10, 2),
            FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
        );
    
        -- Create OrderItems table
        CREATE TABLE OrderItems (
            OrderItemID INT PRIMARY KEY,
            OrderID INT,
            ProductID INT,
            Quantity INT,
            UnitPrice DECIMAL(10, 2),
            FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
            FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
        );
    
        -- Create a view for customer order summaries
        CREATE VIEW CustomerOrderSummary AS
        SELECT
            c.CustomerID,
            c.FirstName,
            c.LastName,
            COUNT(o.OrderID) AS TotalOrders,
            SUM(o.TotalAmount) AS TotalSpent
        FROM
            Customers c
            LEFT JOIN Orders o ON c.CustomerID = o.CustomerID
        GROUP BY
            c.CustomerID,
            c.FirstName,
            c.LastName;
    
        -- Create a stored procedure to add a new product
        DELIMITER //
        CREATE PROCEDURE AddProduct(
            IN p_ProductName VARCHAR(100),
            IN p_Description TEXT,
            IN p_Price DECIMAL(10, 2),
            IN p_StockQuantity INT
        )
        BEGIN
            INSERT INTO Products (ProductName, Description, Price, StockQuantity)
            VALUES (p_ProductName, p_Description, p_Price, p_StockQuantity);
        END //
        DELIMITER ;
    
        -- Create a trigger to update stock quantity after an order is placed
        DELIMITER //
        CREATE TRIGGER UpdateStockAfterOrder
        AFTER INSERT ON OrderItems
        FOR EACH ROW
        BEGIN
            UPDATE Products
            SET StockQuantity = StockQuantity - NEW.Quantity
            WHERE ProductID = NEW.ProductID;
        END //
        DELIMITER ;
        `,
        tags: ["SQL", "E-commerce", "Database Script", "Retail", "Backend"],
        link: "https://github.com/ertanhasani/ecommerce/blob/master/ecommerce-db-script.sql",
        lnum: "1"
    },
    {
        code: `
        import torch
        import torch.nn as nn
        import torch.optim as optim
    
        class SimpleNN(nn.Module):
            def __init__(self):
                super(SimpleNN, self).__init__()
                self.fc1 = nn.Linear(10, 50)
                self.relu = nn.ReLU()
                self.fc2 = nn.Linear(50, 1)
            
            def forward(self, x):
                x = self.fc1(x)
                x = self.relu(x)
                x = self.fc2(x)
                return x
    
        model = SimpleNN()
        criterion = nn.MSELoss()
        optimizer = optim.SGD(model.parameters(), lr=0.01)
    
        inputs = torch.randn(5, 10)
        target = torch.randn(5, 1)
    
        output = model(inputs)
        loss = criterion(output, target)
    
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
        `,
        tags: ["Python", "PyTorch", "AI/ML", "Backend", "Machine Learning Model"], 
        link: "",
        lnum: ""
    },
    {
        code: `
        class Warehouse:
            def __init__(self):
                self.inventory = {}
    
            def add_item(self, item_name, quantity):
                if item_name in self.inventory:
                    self.inventory[item_name] += quantity
                else:
                    self.inventory[item_name] = quantity
    
            def remove_item(self, item_name, quantity):
                if item_name in self.inventory and self.inventory[item_name] >= quantity:
                    self.inventory[item_name] -= quantity
                    if self.inventory[item_name] == 0:
                        del self.inventory[item_name]
                    return True
                return False
    
            def check_inventory(self):
                return self.inventory
    
        warehouse = Warehouse()
        warehouse.add_item("Laptop", 10)
        warehouse.remove_item("Laptop", 2)
        print(warehouse.check_inventory())
        `,
        tags: ["Python", "Logistics", "Backend", "Inventory Management", "SaaS"], 
        link: "",
        lnum: ""
    },
       
    {
        code: `CREATE TABLE sales (
        id SERIAL PRIMARY KEY,
        product_name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        quantity INT NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        sale_date DATE NOT NULL
    );
    
    INSERT INTO sales (product_name, category, quantity, price, sale_date) 
    VALUES 
    ('Laptop', 'Electronics', 2, 799.99, '2024-02-01'),
    ('Headphones', 'Electronics', 5, 199.99, '2024-02-02'),
    ('Coffee Maker', 'Home Appliances', 3, 99.99, '2024-02-03');
    
    SELECT category, SUM(quantity) AS total_sold, SUM(quantity * price) AS revenue 
    FROM sales 
    GROUP BY category
    ORDER BY revenue DESC;`,
        tags: ["SQL", "Database", "Retail", "E-commerce", "Data Analytics"],
        link: "https://github.com/postgres/postgres/blob/master/src/test/sql/select.sql",
        lnum: "3-20"
    }
      
];

let currentSnippet = {}
let userTags = []
let timer
let startTime
let timeLeft = 90 // Changed to 90 seconds
const difficulty = "medium"
let hintsUsed = 0
let currentRound = 1
let totalScore = 0
let roundScores = []

// DOM Elements
const codeSnippetElement = document.getElementById("code-snippet")
const timerElement = document.getElementById("timer")
const tagsContainer = document.getElementById("tags-container")
const resultsElement = document.getElementById("results")
const roundInfoElement = document.getElementById("round-info")
const totalScoreElement = document.getElementById("total-score")
const hintDisplay = document.getElementById("hint-display")
const hintText = document.getElementById("hint-text")
const closeHintBtn = document.getElementById("close-hint")
const tagInput = document.getElementById("tag-input")

// Functions
function startGame() {
  if (currentRound > 6) {
    endGame()
    return
  }

  userTags = []
  tagsContainer.innerHTML = ""
  resultsElement.innerHTML = ""
  tagInput.disabled = false
  tagInput.value = ""
  hintsUsed = 0
  document.getElementById("hint-btn").disabled = false

  currentSnippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)]
  codeSnippetElement.textContent = currentSnippet.code

  timeLeft = 90 // Set to 90 seconds
  startTime = Date.now()

  timerElement.textContent = `Time Left: ${timeLeft}s`
  updateTimerBar(timeLeft)

  roundInfoElement.textContent = `Round: ${currentRound} / 6`
  totalScoreElement.textContent = `Total Score: ${totalScore}`

  // Set the width of the bonus section
  const bonusSection = document.getElementById("bonus-section")
  bonusSection.style.width = "33.33%" // Adjusted for 30 seconds out of 90

  hintDisplay.classList.add("hidden")
  hintText.textContent = ""

  timer = setInterval(() => {
    timeLeft--
    timerElement.textContent = `Time Left: ${timeLeft}s`
    updateTimerBar(timeLeft)

    if (timeLeft <= 0) {
      clearInterval(timer)
      submitTags()
    }
  }, 1000)
}

function updateTimerBar(timeLeft) {
  const totalDuration = 90
  const percentage = (timeLeft / totalDuration) * 100

  const timerBar = document.getElementById("timer-bar")
  timerBar.style.width = `${percentage}%`

  timerElement.textContent = `Time Left: ${timeLeft}s`
}

function addTag() {
  const tag = tagInput.value.trim()

  if (tag && userTags.length < 5 && !userTags.some((t) => t.tag === tag)) {
    userTags.push({ tag, timeAdded: Math.floor((Date.now() - startTime) / 1000) })

    const tagElement = document.createElement("span")
    tagElement.textContent = tag
    tagElement.className = "tag fade-in"
    tagsContainer.appendChild(tagElement)
  }

  if (userTags.length >= 5) {
    tagInput.disabled = true
  }

  tagInput.value = ""
}

function submitTags() {
  clearInterval(timer)

  // Submit the current tag in the input if it's not empty
  if (tagInput.value.trim()) {
    addTag()
  }

  let score = 0
  const correctTags = currentSnippet.tags.map((tag) => tag.toLowerCase())

  const userCorrectTags = []
  tagsContainer.childNodes.forEach((tagElement) => {
    const userTag = userTags.find((t) => t.tag === tagElement.textContent)?.tag.toLowerCase()
    if (userTag && correctTags.includes(userTag)) {
      tagElement.classList.add("correct")
      userCorrectTags.push(userTag)

      // Base score for correct tags
      score += 50

      // Extra points if added within first 30 seconds
      const tagTime = userTags.find((t) => t.tag === tagElement.textContent)?.timeAdded
      if (tagTime <= 30) {
        score += 20
      }
    } else {
      tagElement.classList.add("incorrect")
    }
  })

  roundScores.push(score)
  totalScore += score

  // Show round results
  const correctTagsHtml = currentSnippet.tags
    .map((tag) => (userCorrectTags.includes(tag.toLowerCase()) ? `<span class="correct-tag">${tag}</span>` : tag))
    .join(", ")

  showResults(`
        <h2>Round ${currentRound} Complete!</h2>
        <p>Total Score: ${totalScore}</p>
        <p>Round Score: ${score}</p>
        <p>Correct Tags: ${correctTagsHtml}</p>
        <button onclick="nextRound()">Next Round</button>
    `)

  currentRound++
}

function nextRound() {
  resultsElement.classList.add("hidden")
  if (currentRound <= 6) {
    startGame()
  } else {
    endGame()
  }
}

function endGame() {
  showResults(`
        <h2>Game Over!</h2>
        <p>Total Score: ${totalScore}</p>
        <h3>Round Scores:</h3>
        <ul>
            ${roundScores.map((score, index) => `<li>Round ${index + 1}: ${score}</li>`).join("")}
        </ul>
        <button onclick="resetGame()">Play Again</button>
    `)
}

function resetGame() {
  currentRound = 1
  totalScore = 0
  roundScores = []
  resultsElement.classList.add("hidden")
  startGame()
}

function getHint() {
  if (hintsUsed >= 2) return // Limit to 2 hints per game

  const correctTags = currentSnippet.tags.map((tag) => tag.toLowerCase())
  const unusedTags = correctTags.filter((tag) => !userTags.some((t) => t.tag.toLowerCase() === tag))

  if (unusedTags.length > 0) {
    const hintTag = unusedTags[Math.floor(Math.random() * unusedTags.length)]
    hintText.textContent = `One of the correct tags is "${hintTag}"`
    hintDisplay.classList.remove("hidden")
    hintsUsed++
    if (hintsUsed >= 2) {
      document.getElementById("hint-btn").disabled = true
    }
  } else {
    hintText.textContent = "No more hints available!"
    hintDisplay.classList.remove("hidden")
  }
}

function closeHint() {
  hintDisplay.classList.add("hidden")
}

function showResults(content) {
  resultsElement.innerHTML = `
        <div class="results-content fade-in">
            ${content}
        </div>
    `
  resultsElement.classList.remove("hidden")
}

// Add event listener for closing the hint
closeHintBtn.addEventListener("click", closeHint)

// Start the Game
startGame()


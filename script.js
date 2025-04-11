// Game Variables
console.log("Script.js loaded successfully - UPDATED VERSION");

const codeSnippets = [
    {
        snippet_id: 1,
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
        lnum: "10-63",
        description: "A TensorFlow implementation of a simple neural network for classification using the Keras API. The code demonstrates how to build, train, and evaluate a basic machine learning model."
    },
    {
        snippet_id: 2,
        code: `
        // Go: Creating a Line Chart using go-echarts
        package main
    
        import (
            "github.com/go-echarts/go-echarts/v2/charts"
            "github.com/go-echarts/go-echarts/v2/opts"
            "github.com/go-echarts/go-echarts/v2/render"
            "math/rand"
            "net/http"
            "os"
        )
    
        func generateLineItems() []opts.LineData {
            items := make([]opts.LineData, 0)
            for i := 0; i < 7; i++ {
                items = append(items, opts.LineData{Value: rand.Intn(100)})
            }
            return items
        }
    
        func lineChartHandler(w http.ResponseWriter, _ *http.Request) {
            line := charts.NewLine()
            line.SetGlobalOptions(
                charts.WithTitleOpts(opts.Title{
                    Title:    "Go Line Chart Example",
                    Subtitle: "Using go-echarts",
                }),
            )
            line.SetXAxis([]string{"Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"}).
                AddSeries("Category A", generateLineItems()).
                AddSeries("Category B", generateLineItems())
    
            f, _ := os.Create("line.html")
            line.Render(render.New(f))
        }
    
        func main() {
            http.HandleFunc("/", lineChartHandler)
            http.ListenAndServe(":8080", nil)
        }
        `,
        tags: ["Go", "Data Visualization", "go-echarts", "Web Development", "Backend"],
        link: "https://github.com/go-echarts/examples/blob/master/examples/line.go",
        lnum: "1",
        description: "A Go application that creates a line chart using the go-echarts library. The code sets up an HTTP server that generates and serves a visualization of random data points across weekdays."
    },
    {
        snippet_id: 3,
        code: `
        # Perl: Web Scraping with LWP and HTML::TreeBuilder
        use strict;
        use warnings;
        use LWP::UserAgent;
        use HTML::TreeBuilder;
    
        # Initialize user agent
        my $ua = LWP::UserAgent->new;
        $ua->agent('Mozilla/5.0');
    
        # URL to scrape
        my $url = 'http://example.com';
    
        # Make HTTP request
        my $response = $ua->get($url);
        die "Error: ", $response->status_line unless $response->is_success;
    
        # Parse HTML content
        my $tree = HTML::TreeBuilder->new;
        $tree->parse_content($response->decoded_content);
    
        # Extract information
        my @links = $tree->look_down(_tag => 'a');
        foreach my $link (@links) {
            my $href = $link->attr('href');
            my $text = $link->as_text;
            print "Link: $text ($href)\n";
        }
    
        # Clean up
        $tree->delete;
        `,
        tags: ["Perl", "Web Scraping", "LWP", "HTML::TreeBuilder", "Scripting"],
        link: "",
        lnum: "1",
        description: "A Perl script that demonstrates web scraping using the LWP (LibWWW-Perl) and HTML::TreeBuilder libraries. The code fetches a webpage, parses its HTML content, and extracts all hyperlinks."
    },
    {
        snippet_id: 4,
        code: `
        // Dart: Building a Simple Flutter App
        import 'package:flutter/material.dart';
    
        void main() => runApp(MyApp());
    
        class MyApp extends StatelessWidget {
            @override
            Widget build(BuildContext context) {
                return MaterialApp(
                    title: 'Flutter Demo',
                    theme: ThemeData(
                        primarySwatch: Colors.blue,
                    ),
                    home: MyHomePage(),
                );
            }
        }
    
        class MyHomePage extends StatefulWidget {
            @override
            _MyHomePageState createState() => _MyHomePageState();
        }
    
        class _MyHomePageState extends State<MyHomePage> {
            int _counter = 0;
    
            void _incrementCounter() {
                setState(() {
                    _counter++;
                });
            }
    
            @override
            Widget build(BuildContext context) {
                return Scaffold(
                    appBar: AppBar(
                        title: Text('Flutter Demo Home Page'),
                    ),
                    body: Center(
                        child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: <Widget>[
                                Text(
                                    'You have pushed the button this many times:',
                                ),
                                Text(
                                    '$_counter',
                                    style: Theme.of(context).textTheme.headline4,
                                ),
                            ],
                        ),
                    ),
                    floatingActionButton: FloatingActionButton(
                        onPressed: _incrementCounter,
                        tooltip: 'Increment',
                        child: Icon(Icons.add),
                    ),
                );
            }
        }
        `,
        tags: ["Dart", "Flutter", "Mobile Development", "UI", "Counter App"],
        link: "https://flutter.dev/docs/get-started/codelab",
        lnum: "1",
        description: "A Flutter application written in Dart that implements a simple counter app. The code demonstrates the basic structure of a Flutter app with stateful widgets, UI components, and state management."
    },
    {
        snippet_id: 5,
        code: `
        % MATLAB: Solving a System of Linear Equations
        % Coefficient matrix
        A = [3, 2, -1;
             2, -2, 4;
            -1, 0.5, -1];
    
        % Right-hand side
        B = [1;
             -2;
             0];
    
        % Solve the system
        X = A \\ B;
    
        % Display the result
        disp('Solution:');
        disp(X);
    
        % Verify the solution
        disp('Verification (A * X):');
        disp(A * X);
        `,
        tags: ["MATLAB", "Linear Algebra", "Systems of Equations", "Numerical Computing", "Matrix Operations"],
        link: "https://www.mathworks.com/help/matlab/ref/mldivide.html",
        lnum: "1",
        description: "A MATLAB script that solves a system of linear equations using matrix division. The code demonstrates how to solve a system of linear equations and verify the solution."
    },
    {
        snippet_id: 6,
        code: `
        // Rust: Implementing a Simple Web Server with Actix-web
        use actix_web::{web, App, HttpServer, Responder, HttpResponse};
    
        async fn index() -> impl Responder {
            HttpResponse::Ok().body("Hello, Rust Web Server!")
        }
    
        #[actix_web::main]
        async fn main() -> std::io::Result<()> {
            HttpServer::new(|| {
                App::new()
                    .route("/", web::get().to(index))
            })
            .bind("127.0.0.1:8080")?
            .run()
            .await
        }
        `,
        tags: ["Rust", "Web Development", "Actix-web", "Backend", "HTTP Server"],
        link: "https://github.com/actix/examples/blob/master/basics/src/main.rs",
        lnum: "1",
        description: "A Rust application that implements a simple web server using the Actix-web framework. The code sets up an HTTP server that responds with a greeting message when accessed."
    },
    {
        snippet_id: 7,
        code: `
        # R: Performing Linear Regression and Plotting Results
        # Load dataset
        data(mtcars)
    
        # Fit linear model
        model <- lm(mpg ~ wt + hp, data=mtcars)
    
        # Print summary
        summary(model)
    
        # Predict values
        predictions <- predict(model, mtcars)
    
        # Plot actual vs predicted
        plot(mtcars$mpg, predictions, col="blue", 
             xlab="Actual MPG", ylab="Predicted MPG", 
             main="Actual vs Predicted MPG")
        abline(0,1, col="red")
        `,
        tags: ["R", "Statistics", "Linear Regression", "Data Visualization", "Machine Learning"],
        link: "https://www.rdocumentation.org/packages/stats/versions/3.6.2/topics/lm",
        lnum: "1",
        description: "An R script that performs linear regression analysis on the mtcars dataset. The code demonstrates how to fit a linear model, make predictions, and visualize the results with a scatter plot comparing actual versus predicted values."
    },
    {
        snippet_id: 8,
        code: `
        # Bash: Backup Script for MySQL Database
        #!/bin/bash
    
        # Configuration
        DB_NAME="my_database"
        DB_USER="root"
        DB_PASS="password"
        BACKUP_DIR="/backups"
        TIMESTAMP=\$(date +"%F-%H-%M-%S")
        BACKUP_FILE="\$BACKUP_DIR/\$DB_NAME-\$TIMESTAMP.sql"
    
        # Create backup directory if it doesn't exist
        mkdir -p \$BACKUP_DIR
    
        # Perform backup
        mysqldump -u \$DB_USER -p\$DB_PASS \$DB_NAME > \$BACKUP_FILE
    
        # Compress backup
        tar -czf \$BACKUP_FILE.tar.gz \$BACKUP_FILE
    
        # Remove uncompressed file
        rm \$BACKUP_FILE
    
        echo "Backup completed: \$BACKUP_FILE.tar.gz"
        `,
        tags: ["Bash", "Database Script", "MySQL", "Backup", "Automation"],
        link: "https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html",
        lnum: "1",
        description: "A Bash shell script that automates MySQL database backups."
    },
    {
        snippet_id: 9,
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
        tags: ["Python", "TensorFlow", "AI/ML", "SaaS"],
        description: "A method signature from TensorFlow's Keras API for training machine learning models."
    },
    {
        snippet_id: 10,
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
        "snippet_id": 11,
        "code": "using System;\nusing System.Linq;\n\nclass Program\n{\n    static void Main()\n    {\n        int[] numbers = { 5, 10, 8, 3, 6, 12 };\n        var numQuery = from num in numbers\n                       where num % 2 == 0\n                       orderby num\n                       select num;\n        foreach (int num in numQuery)\n        {\n            Console.WriteLine(num);\n        }\n    }\n}",
        "tags": ["C#", "LINQ", "Arrays", "Query"],
        "link": "https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/linq/basic-linq-query-operations",
        "lnum": "1-16",
        "description": "A C# program demonstrating LINQ (Language Integrated Query) to filter, sort, and display even numbers from an array. Shows the declarative query syntax that C# provides for data manipulation."
    },
    {
        "snippet_id": 12,
        "code": "const http = require('http');\n\nconst hostname = '127.0.0.1';\nconst port = 3000;\n\nconst server = http.createServer((req, res) => {\n  res.statusCode = 200;\n  res.setHeader('Content-Type', 'text/plain');\n  res.end('Hello, World!');\n});\n\nserver.listen(port, hostname, () => {\n  console.log(`Server running at http://${hostname}:${port}/`);\n});",
        "tags": ["JavaScript", "Node.js", "HTTP Server", "Networking"],
        "link": "https://nodejs.org/en/docs/guides/getting-started-guide/",
        "lnum": "1-12",
        "description": "A basic Node.js HTTP server implementation that listens on port 3000 and responds with 'Hello, World!'. This is the standard starting point for Node.js web applications."
    },
    {
        "snippet_id": 13,
        "code": "import socket\nimport os\nimport sys\nimport time\nimport threading\nfrom queue import Queue\n\n# Number of threads\nN_THREADS = 200\n\n# Thread queue\nq = Queue()\n\n# List of common ports to scan\ncommon_ports = [21, 22, 23, 25, 53, 80, 110, 111, 135, 139, 143, 443, 445, 993, 995, 1723, 3306, 3389, 5900, 8080]\n\n# Lock for thread-safe printing\nprint_lock = threading.Lock()\n\n# Function to scan a single port\ndef port_scan(port):\n    try:\n        s = socket.socket()\n        s.settimeout(1)\n        s.connect((target, port))\n    except:\n        with print_lock:\n            print(f\"Port {port}: Closed\")\n    else:\n        with print_lock:\n            print(f\"Port {port}: Open\")\n    finally:\n        s.close()\n\n# Worker function to get port from queue and scan it\ndef worker():\n    while True:\n        port = q.get()\n        port_scan(port)\n        q.task_done()\n\n# Main function\nif __name__ == \"__main__\":\n    if len(sys.argv) != 2:\n        print(\"Usage: python3 scanner.py <target>\")\n        sys.exit(1)\n\n    target = sys.argv[1]\n\n    # Start threads\n    for t in range(N_THREADS):\n        t = threading.Thread(target=worker)\n        t.daemon = True\n        t.start()\n\n    # Put ports into queue\n    for port in common_ports:\n        q.put(port)\n\n    # Wait for queue to be empty\n    q.join()\n\n    print(\"Scan complete.\")",
        "tags": ["Python", "Network Security", "Port Scanning", "Threading"],
        "link": "https://github.com/your-repo/network-scanner/blob/main/scanner.py",
        "lnum": "1-50",
        "description": "A multi-threaded port scanner written in Python that checks for open ports on a target host. The script uses threading to efficiently scan multiple ports simultaneously."
    },
    {
        "snippet_id": 14,
        "code": "#include <pcap.h>\n#include <stdio.h>\n#include <arpa/inet.h>\n#include <netinet/ip.h>\n#include <netinet/if_ether.h>\n\nvoid process_packet(u_char *, const struct pcap_pkthdr *, const u_char *);\n\nint main(int argc, char *argv[])\n{\n    pcap_if_t *alldevs, *device;\n    pcap_t *handle;\n    char errbuf[PCAP_ERRBUF_SIZE];\n\n    // Find all available devices\n    if (pcap_findalldevs(&alldevs, errbuf) == -1)\n    {\n        fprintf(stderr, \"Error finding devices: %s\\n\", errbuf);\n        return 1;\n    }\n\n    // Use the first available device\n    device = alldevs;\n\n    // Open the device for packet capture\n    handle = pcap_open_live(device->name, BUFSIZ, 1, 1000, errbuf);\n    if (handle == NULL)\n    {\n        fprintf(stderr, \"Could not open device %s: %s\\n\", device->name, errbuf);\n        return 1;\n    }\n\n    // Start packet processing loop\n    pcap_loop(handle, 0, process_packet, NULL);\n\n    // Close the handle\n    pcap_close(handle);\n\n    return 0;\n}\n\nvoid process_packet(u_char *args, const struct pcap_pkthdr *header, const u_char *buffer)\n{\n    struct ethhdr *eth = (struct ethhdr *)buffer;\n    struct iphdr *ip = (struct iphdr *)(buffer + sizeof(struct ethhdr));\n\n    printf(\"Ethernet Header\\n\");\n    printf(\"   |-Source Address      : %02X-%02X-%02X-%02X-%02X-%02X \\n\", eth->h_source[0], eth->h_source[1], eth->h_source[2], eth->h_source[3], eth->h_source[4], eth->h_source[5]);\n    printf(\"   |-Destination Address : %02X-%02X-%02X-%02X-%02X-%02X \\n\", eth->h_dest[0], eth->h_dest[1], eth->h_dest[2], eth->h_dest[3], eth->h_dest[4], eth->h_dest[5]);\n\n    printf(\"IP Header\\n\");\n    printf(\"   |-Source IP        : %s\\n\", inet_ntoa(*(struct in_addr *)&ip->saddr));\n    printf(\"   |-Destination IP   : %s\\n\", inet_ntoa(*(struct in_addr *)&ip->daddr));\n}",
        "tags": ["C", "Network Security", "Packet Sniffing", "Libpcap"],
        "link": "https://github.com/your-repo/packet-sniffer/blob/main/sniffer.c",
        "lnum": "1-50",
        "description": "A packet sniffer written in C using the libpcap library. The program captures network packets, extracts Ethernet and IP header information, and displays source and destination addresses."
    },
    
    {
        "snippet_id": 15,
        "code": `package main
    
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
        "tags": ["Go", "Backend", "API", "Cloud Computing", "Web Server"],
        "link": "https://github.com/golang/go/blob/master/src/net/http/server.go",
        "lnum": "5-19",
        "description": "A minimal Go web server that responds with 'Hello, World!' to all HTTP requests. This demonstrates Go's built-in HTTP server capabilities and handler functions."
    },
    {
        "snippet_id": 16,
        "code": `
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
        "tags": ["Java", "Spring Boot", "REST API", "Backend", "Web Development"],
        "link": "https://github.com/spring-projects/spring-boot/blob/main/spring-boot-samples/spring-boot-sample-web/src/main/java/com/example/springboot/DemoApplication.java",
        "lnum": "1",
        "description": "A Spring Boot application that implements a RESTful API for user management. The code demonstrates Spring's annotations for creating controllers, handling HTTP requests, and managing data models."
    },
    {
        "snippet_id": 17,
        "code": `
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
        "tags": ["C++", "Qt", "GUI", "Desktop Application", "Frontend"],
        "link": "https://github.com/qt/qtbase/blob/dev/examples/widgets/widgets/mainwindows/mdi/mdi.cpp",
        "lnum": "1",
        "description": "A Qt-based C++ application that creates a simple form with input fields for name, email, and address. The code demonstrates Qt's widget-based GUI development and layout management."
    },
    {
        "snippet_id": 18,
        "code": `
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
        "tags": ["JavaScript", "React", "Frontend", "Web Development", "UI"],
        "link": "https://github.com/facebook/react/blob/main/examples/todomvc/src/components/TodoApp.js",
        "lnum": "1",
        "description": "A React-based Todo application that allows users to add, complete, and delete tasks. The code demonstrates React hooks (useState), functional components, and state management in a modern React application."
    },
    
    {
        "snippet_id": 19,
        "code": `
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
        "tags": ["SQL", "E-commerce", "Database Script", "Retail", "Backend"],
        "link": "https://github.com/ertanhasani/ecommerce/blob/master/ecommerce-db-script.sql",
        "lnum": "1",
        "description": "An SQL script that creates a complete database schema for an e-commerce application. The script defines tables for customers, products, orders, and order items, along with views, stored procedures, and triggers for business logic."
    },
    {
        "snippet_id": 20,
        "code": `
    class Blog(models.Model):
        name = models.CharField(max_length=100)
        tagline = models.TextField()
    
        def __str__(self):
            return self.name
    
    class Author(models.Model):
        name = models.CharField(max_length=50)
        email = models.EmailField()
    
        def __str__(self):
            return self.name
    
    class Entry(models.Model):
        blog = models.ForeignKey(Blog, on_delete=models.CASCADE)
        headline = models.CharField(max_length=255)
        body_text = models.TextField()
        pub_date = models.DateField()
        mod_date = models.DateField()
        authors = models.ManyToManyField(Author)
        n_comments = models.IntegerField()
        n_pingbacks = models.IntegerField()
        rating = models.IntegerField()
    
        def __str__(self):
            return self.headline
    `, 
        "tags": ["Python", "Django", "Backend", "Database Script", "Object-Oriented Programming (OOP)"], 
        "link": "https://github.com/django/django/blob/main/tests/model_fields/models.py", 
        "lnum": "Line 10", 
        "description": "Django models for a blog application, demonstrating Django's ORM (Object-Relational Mapping) capabilities. The code defines models for blogs, authors, and blog entries with various field types and relationships."
    },

    {
        "snippet_id": 21,
        "code": "def index(request):\n    latest_question_list = Question.objects.order_by('-pub_date')[:5]\n    context = {'latest_question_list': latest_question_list}\n    return render(request, 'polls/index.html', context)\n\ndef detail(request, question_id):\n    question = get_object_or_404(Question, pk=question_id)\n    return render(request, 'polls/detail.html', {'question': question})\n\ndef results(request, question_id):\n    question = get_object_or_404(Question, pk=question_id)\n    return render(request, 'polls/results.html', {'question': question})\n\ndef vote(request, question_id):\n    question = get_object_or_404(Question, pk=question_id)\n    try:\n        selected_choice = question.choice_set.get(pk=request.POST['choice'])\n    except (KeyError, Choice.DoesNotExist):\n        return render(request, 'polls/detail.html', {\n            'question': question,\n            'error_message': \"You didn't select a choice.\",\n        })\n    else:\n        selected_choice.votes += 1\n        selected_choice.save()\n        return HttpResponseRedirect(reverse('polls:results', args=(question.id,)))\n",
        "tags": ["Python", "Django", "Backend", "MVC", "Web Development"],
        "link": "https://github.com/django/django/blob/main/docs/intro/tutorial03.txt",
        "lnum": "1",
        "description": "Django view functions for a polling application, showing how to handle HTTP requests, interact with the database, and render templates. The code implements the classic MVC (Model-View-Controller) pattern in Django's style."
    },
    
    {
        "snippet_id": 22,
        "code": `
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
        "tags": ["Python", "PyTorch", "AI/ML", "Backend", "Machine Learning Model"], 
        "link": "",
        "lnum": "",
        "description": "A PyTorch implementation of a simple neural network with forward and backward passes. The code demonstrates how to define a neural network architecture, compute loss, and update weights using gradient descent."
    },
    {
        "snippet_id": 23,
        "code": `
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
        "tags": ["Python", "Logistics", "Backend", "Inventory Management", "SaaS"], 
        "link": "",
        "lnum": "",
        "description": "A Python class implementing a simple warehouse inventory management system. The code demonstrates object-oriented programming concepts with methods for adding, removing, and checking inventory items."
    },
       
    {
        "snippet_id": 24,
        "code": `CREATE TABLE sales (
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
        "tags": ["SQL", "Database", "Retail", "E-commerce", "Data Analytics"],
        "link": "https://github.com/postgres/postgres/blob/master/src/test/sql/select.sql",
        "lnum": "3-20",
        "description": "An SQL script that creates a sales table, populates it with sample data, and runs an analytical query to calculate total sales and revenue by product category. The code demonstrates SQL data definition, manipulation, and aggregation capabilities."
    },
    {
        "snippet_id": 25,
        "code": `
    def read_csv(filepath_or_buffer, sep=',', delimiter=None, header='infer', names=None,
                 index_col=None, usecols=None, squeeze=False, prefix=None, mangle_dupe_cols=True,
                 dtype=None, engine=None, converters=None, true_values=None, false_values=None,
                 skipinitialspace=False, skiprows=None, nrows=None, na_values=None,
                 keep_default_na=True, na_filter=True, verbose=False, skip_blank_lines=True,
                 parse_dates=False, infer_datetime_format=False, keep_date_col=False,
                 date_parser=None, dayfirst=False, cache_dates=True, iterator=False, chunksize=None,
                 compression='infer', thousands=None, decimal='.', lineterminator=None,
                 quotechar='"', quoting=0, doublequote=True, escapechar=None, comment=None,
                 encoding=None, dialect=None, error_bad_lines=True, warn_bad_lines=True,
                 delim_whitespace=False, low_memory=True, memory_map=False, float_precision=None,
                 storage_options=None):
        """
        # Handle deprecations
        if delimiter is not None:
            sep = delimiter
        elif sep is None:
            sep = ','
    
        # Validate inputs
        if not isinstance(sep, str):
            raise TypeError(f"Expected a string for 'sep', but got {type(sep).__name__}")
        if delimiter is not None:
            warnings.warn("The 'delimiter' argument is deprecated and will be removed in a future version. "
                          "Use 'sep' instead.", FutureWarning, stacklevel=2)
    
        # Initialize the parser
        parser = TextFileReader(filepath_or_buffer, sep=sep, delimiter=delimiter, header=header,
                                names=names, index_col=index_col, usecols=usecols, squeeze=squeeze,
                                prefix=prefix, mangle_dupe_cols=mangle_dupe_cols, dtype=dtype,
                                engine=engine, converters=converters, true_values=true_values,
                                false_values=false_values, skipinitialspace=skipinitialspace,
                                skiprows=skiprows, nrows=nrows, na_values=na_values,
                                keep_default_na=keep_default_na, na_filter=na_filter, verbose=verbose,
                                skip_blank_lines=skip_blank_lines, parse_dates=parse_dates,
                                infer_datetime_format=infer_datetime_format, keep_date_col=keep_date_col,
                                date_parser=date_parser, dayfirst=dayfirst, cache_dates=cache_dates,
                                iterator=iterator, chunksize=chunksize, compression=compression,
                                thousands=thousands, decimal=decimal, lineterminator=lineterminator,
                                quotechar=quotechar, quoting=quoting, doublequote=doublequote,
                                escapechar=escapechar, comment=comment, encoding=encoding,
                                dialect=dialect, error_bad_lines=error_bad_lines,
                                warn_bad_lines=warn_bad_lines, delim_whitespace=delim_whitespace,
                                low_memory=low_memory, memory_map=memory_map, float_precision=float_precision,
                                storage_options=storage_options)
    
        # Return the parsed data
        if iterator or chunksize:
            return parser
        else:
            return parser.read()
    `,
        "tags": ["Python", "Pandas", "Backend", "Data Structures", "Data Analysis"],
        "link": "https://github.com/pandas-dev/pandas/blob/main/pandas/io/parsers.py",
        "lnum": 0,
        "description": "Flexible and powerful data analysis/manipulation library for Python."
    },
    {
        "snippet_id": 25,
        "code": `
    def get(self, request, *args, **kwargs):
        self.object = self.get_object()
        context = self.get_context_data(object=self.object)
        return self.render_to_response(context)
    
    def post(self, request, *args, **kwargs):
        self.object = self.get_object()
        form = self.get_form()
        if form.is_valid():
            return self.form_valid(form)
        else:
            return self.form_invalid(form)
        `,
        "tags": ["Python", "Django", "Backend", "OOP", "MVC"],
        "link": "https://github.com/django/django/blob/main/django/views/generic/edit.py",
        "lnum": "line 133",
        "description": "Django: High-level Python web framework that encourages rapid development."
    },
    {
        "snippet_id": 26,
        "code": `
    class FastAPI:
        def __init__(self, *,
                     debug: bool = False,
                     routes: Optional[Sequence[BaseRoute]] = None,
                     title: str = "FastAPI",
                     description: str = "",
                     version: str = "0.1.0",
                     openapi_url: Optional[str] = "/openapi.json",
                     openapi_tags: Optional[List[Dict[str, Any]]] = None,
                     servers: Optional[List[Dict[str, Union[str, Any]]]] = None,
                     default_response_class: Type[Response] = JSONResponse,
                     docs_url: Optional[str] = "/docs",
                     redoc_url: Optional[str] = "/redoc",
                     swagger_ui_oauth2_redirect_url: Optional[str] = "/docs/oauth2-redirect",
                     swagger_ui_init_oauth: Optional[Dict[str, Any]] = None,
                     dependencies: Optional[Sequence[params.Depends]] = None,
                     default: Optional[APIRouter] = None,
                     **extra: Any) -> None:
            self.debug = debug
            self.title = title
            self.description = description
            self.version = version
            self.openapi_url = openapi_url
            self.openapi_tags = openapi_tags
            self.servers = servers or []
            self.default_response_class = default_response_class
            self.docs_url = docs_url
            self.redoc_url = redoc_url
            self.swagger_ui_oauth2_redirect_url = swagger_ui_oauth2_redirect_url
            self.swagger_ui_init_oauth = swagger_ui_init_oauth
            self.dependencies = dependencies or []
            self.extra = extra
            self.router = default or APIRouter()
            if routes:
                self.router.routes.extend(routes)
            self.exception_handlers: Dict[Union[int, Type[Exception]], Callable[[Request, Exception], Coroutine[Any, Any, Response]]] = {}
            self.middleware_stack = self.build_middleware_stack()
            self.openapi_schema: Optional[Dict[str, Any]] = None
            self.setup()
        `,
        "tags": ["Python", "FastAPI", "Backend", "OOP", "API"],
        "link": "https://github.com/tiangolo/fastapi/blob/master/fastapi/applications.py",
        "lnum": "line 20",
        "description": "FastAPI: Modern, fast (high-performance) web framework for building APIs with Python."
    },
    {
        "snippet_id": 27,
        "code": `
    class App extends Component {
      constructor() {
        super();
        this.state = {
          items: [],
          isLoaded: false,
        };
      }
    
      componentDidMount() {
        fetch('https://api.example.com/items')
          .then(res => res.json())
          .then(json => {
            this.setState({
              isLoaded: true,
              items: json,
            });
          });
      }
    
      render() {
        const { items, isLoaded } = this.state;
        if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
          return (
            <div className="App">
              <ul>
                {items.map(item => (
                  <li key={item.id}>
                    {item.name} - {item.price}
                  </li>
                ))}
              </ul>
            </div>
          );
        }
      }
    }
        `,
        "tags": ["JavaScript", "React", "Frontend", "OOP", "API"],
        "link": "https://github.com/facebook/react/blob/main/examples/fetch-example/src/App.js",
        "lnum": "line 1",
        "description": "React: JavaScript library for building user interfaces."
    },
    {
        "snippet_id": 28,
        "code": `
    class FastAPI:
        def __init__(self, *,
                     debug: bool = False,
                     routes: Optional[Sequence[BaseRoute]] = None,
                     title: str = "FastAPI",
                     description: str = "",
                     version: str = "0.1.0",
                     openapi_url: Optional[str] = "/openapi.json",
                     openapi_tags: Optional[List[Dict[str, Any]]] = None,
                     servers: Optional[List[Dict[str, Union[str, Any]]]] = None,
                     default_response_class: Type[Response] = JSONResponse,
                     docs_url: Optional[str] = "/docs",
                     redoc_url: Optional[str] = "/redoc",
                     swagger_ui_oauth2_redirect_url: Optional[str] = "/docs/oauth2-redirect",
                     swagger_ui_init_oauth: Optional[Dict[str, Any]] = None,
                     dependencies: Optional[Sequence[params.Depends]] = None,
                     default: Optional[APIRouter] = None,
                     **extra: Any) -> None:
            self.debug = debug
            self.title = title
            self.description = description
            self.version = version
            self.openapi_url = openapi_url
            self.openapi_tags = openapi_tags
            self.servers = servers or []
            self.default_response_class = default_response_class
            self.docs_url = docs_url
            self.redoc_url = redoc_url
            self.swagger_ui_oauth2_redirect_url = swagger_ui_oauth2_redirect_url
            self.swagger_ui_init_oauth = swagger_ui_init_oauth
            self.dependencies = dependencies or []
            self.extra = extra
            self.router = default or APIRouter()
            if routes:
                self.router.routes.extend(routes)
            self.exception_handlers: Dict[Union[int, Type[Exception]], Callable[[Request, Exception], Coroutine[Any, Any, Response]]] = {}
            self.middleware_stack = self.build_middleware_stack()
            self.openapi_schema: Optional[Dict[str, Any]] = None
            self.setup()
        `,
        "tags": ["Python", "FastAPI", "Backend", "OOP", "API"],
        "link": "https://github.com/tiangolo/fastapi/blob/master/fastapi/applications.py",
        "lnum": "line 20",
        "description": "FastAPI: Modern, fast (high-performance) web framework for building APIs with Python."
    },
    {
        "snippet_id": 29,
        "code": `
    class App extends Component {
      constructor() {
        super();
        this.state = {
          items: [],
          isLoaded: false,
        };
      }
    
      componentDidMount() {
        fetch('https://api.example.com/items')
          .then(res => res.json())
          .then(json => {
            this.setState({
              isLoaded: true,
              items: json,
            });
          });
      }
    
      render() {
        const { items, isLoaded } = this.state;
        if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
          return (
            <div className="App">
              <ul>
                {items.map(item => (
                  <li key={item.id}>
                    {item.name} - {item.price}
                  </li>
                ))}
              </ul>
            </div>
          );
        }
      }
    }
        `,
        "tags": ["JavaScript", "React", "Frontend", "OOP", "API"],
        "link": "https://github.com/facebook/react/blob/main/examples/fetch-example/src/App.js",
        "lnum": "line 1",
        "description": "React: JavaScript library for building user interfaces."
    },
    {
        "snippet_id": 30,
        "code": `
        from flask import Flask, request, jsonify
        from flask_sqlalchemy import SQLAlchemy
    
        app = Flask(__name__)
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
        db = SQLAlchemy(app)
    
        class User(db.Model):
            id = db.Column(db.Integer, primary_key=True)
            username = db.Column(db.String(80), unique=True, nullable=False)
            email = db.Column(db.String(120), unique=True, nullable=False)
            posts = db.relationship('Post', backref='author', lazy=True)
    
            def __repr__(self):
                return f'<User {self.username}>'
    
        class Post(db.Model):
            id = db.Column(db.Integer, primary_key=True)
            title = db.Column(db.String(100), nullable=False)
            content = db.Column(db.Text, nullable=False)
            user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
            def __repr__(self):
                return f'<Post {self.title}>'
    
        @app.route('/users', methods=['GET'])
        def get_users():
            users = User.query.all()
            return jsonify([{'id': u.id, 'username': u.username, 'email': u.email} for u in users])
    
        @app.route('/posts', methods=['GET'])
        def get_posts():
            posts = Post.query.all()
            return jsonify([{'id': p.id, 'title': p.title, 'content': p.content, 'author': p.author.username} for p in posts])
    
        if __name__ == '__main__':
            db.create_all()
            app.run(debug=True)
        `,
        "tags": ["Python", "Flask", "Backend", "API", "Database Technologies"],
        "link": "https://github.com/pallets/flask/blob/main/examples/tutorial/flaskr/app.py",
        "lnum": "1",
        "description": "Flask: A lightweight WSGI web application framework in Python."
    },
    {
        "snippet_id": 31,
        "code": `
        import React, { useState, useEffect } from 'react';
    
        function App() {
            const [count, setCount] = useState(0);
            const [data, setData] = useState([]);
    
            useEffect(() => {
                fetch('https://jsonplaceholder.typicode.com/posts')
                    .then(response => response.json())
                    .then(data => setData(data.slice(0, 10)));
            }, []);
    
            return (
                <div>
                    <h1>React Example App</h1>
                    <p>You clicked {count} times</p>
                    <button onClick={() => setCount(count + 1)}>
                        Click me
                    </button>
    
                    <h2>Posts</h2>
                    <ul>
                        {data.map(post => (
                            <li key={post.id}>
                                <h3>{post.title}</h3>
                                <p>{post.body}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
    
        export default App;
        `,
        "tags": ["JavaScript", "React", "Frontend", "Functional Programming", "State Management"],
        "link": "https://github.com/facebook/react/blob/main/examples/hooks/src/App.js",
        "lnum": "1",
        "description": "React: A JavaScript library for building user interfaces."
    },
    {
        "snippet_id": 32,
        "code": `
        apiVersion: apps/v1
        kind: Deployment
        metadata:
          name: nginx-deployment
          labels:
            app: nginx
        spec:
          replicas: 3
          selector:
            matchLabels:
              app: nginx
          template:
            metadata:
              labels:
                app: nginx
            spec:
              containers:
              - name: nginx
                image: nginx:1.14.2
                ports:
                - containerPort: 80
        ---
        apiVersion: v1
        kind: Service
        metadata:
          name: nginx-service
        spec:
          selector:
            app: nginx
          ports:
            - protocol: TCP
              port: 80
              targetPort: 80
          type: LoadBalancer
        ---
        apiVersion: networking.k8s.io/v1
        kind: Ingress
        metadata:
          name: nginx-ingress
        spec:
          rules:
          - host: example.com
            http:
              paths:
              - path: /
                pathType: Prefix
                backend:
                  service:
                    name: nginx-service
                    port:
                      number: 80
        `,
        "tags": ["YAML", "Kubernetes", "Cloud/DevOps Tools", "Deployment", "Configuration"],
        "link": "https://github.com/kubernetes/website/blob/main/content/en/examples/application/deployment.yaml",
        "lnum": "1",
        "description": "Kubernetes: An open-source system for automating deployment, scaling, and management of containerized applications."
    },
    {
        "snippet_id": 33,
        "code": `
        import pandas as pd
        import numpy as np
    
        class DataFrameProcessor:
            def __init__(self, data):
                self.df = pd.DataFrame(data)
    
            def clean_data(self):
                self.df.dropna(inplace=True)
                self.df.drop_duplicates(inplace=True)
    
            def add_column(self, column_name, default_value=np.nan):
                self.df[column_name] = default_value
    
            def filter_rows(self, condition):
                return self.df.query(condition)
    
            def group_and_aggregate(self, group_by_column, agg_column, agg_func):
                return self.df.groupby(group_by_column)[agg_column].agg(agg_func)
    
            def merge_with(self, other_df, on_column, how='inner'):
                return pd.merge(self.df, other_df, on=on_column, how=how)
    
            def save_to_csv(self, file_path):
                self.df.to_csv(file_path, index=False)
    
            def load_from_csv(self, file_path):
                self.df = pd.read_csv(file_path)
    
        # Example usage
        if __name__ == "__main__":
            data = {
                'A': [1, 2, 3, 4, 5],
                'B': [5, 4, np.nan, 2, 1],
                'C': ['foo', 'bar', 'baz', 'qux', 'quux']
            }
            processor = DataFrameProcessor(data)
            processor.clean_data()
            processor.add_column('D', default_value=0)
            filtered_df = processor.filter_rows('A > 2')
            aggregated_df = processor.group_and_aggregate('C', 'A', 'sum')
            processor.save_to_csv('processed_data.csv')
        `,
        "tags": ["Python", "Pandas", "Data Libraries", "Data Processing", "OOP"],
        "link": "https://github.com/pandas-dev/pandas/blob/main/pandas/core/frame.py",
        "lnum": "1",
        "description": "Pandas: Python library for data manipulation and analysis."
    },
    {
        "snippet_id": 34,
        "code": `
        import numpy as np
    
        class MatrixOperations:
            def __init__(self, matrix):
                self.matrix = np.array(matrix)
    
            def add(self, other):
                return np.add(self.matrix, other.matrix)
    
            def subtract(self, other):
                return np.subtract(self.matrix, other.matrix)
    
            def multiply(self, other):
                return np.dot(self.matrix, other.matrix)
    
            def transpose(self):
                return np.transpose(self.matrix)
    
            def inverse(self):
                return np.linalg.inv(self.matrix)
    
            def determinant(self):
                return np.linalg.det(self.matrix)
    
            def eigenvalues_and_vectors(self):
                return np.linalg.eig(self.matrix)
    
            def solve_linear_system(self, b):
                return np.linalg.solve(self.matrix, np.array(b))
    
        # Example usage
        if __name__ == "__main__":
            mat1 = MatrixOperations([[1, 2], [3, 4]])
            mat2 = MatrixOperations([[5, 6], [7, 8]])
            result_add = mat1.add(mat2)
            result_sub = mat1.subtract(mat2)
            result_mul = mat1.multiply(mat2)
            result_transpose = mat1.transpose()
            result_inverse = mat1.inverse()
            result_determinant = mat1.determinant()
            result_eigen = mat1.eigenvalues_and_vectors()
            result_solve = mat1.solve_linear_system([1, 2])
        `,
        "tags": ["Python", "NumPy", "Data Libraries", "Linear Algebra", "OOP"],
        "link": "https://github.com/numpy/numpy/blob/main/numpy/linalg/linalg.py",
        "lnum": "1",
        "description": "NumPy: Fundamental package for scientific computing with Python."
    },
    {
        "snippet_id": 35,
        "code": `
        import tensorflow as tf
        from tensorflow.keras.models import Sequential
        from tensorflow.keras.layers import Dense, Flatten
        from tensorflow.keras.optimizers import Adam
        from tensorflow.keras.losses import SparseCategoricalCrossentropy
        from tensorflow.keras.datasets import mnist
    
        class MNISTModel:
            def __init__(self):
                self.model = Sequential([
                    Flatten(input_shape=(28, 28)),
                    Dense(128, activation='relu'),
                    Dense(10, activation='softmax')
                ])
                self.model.compile(optimizer=Adam(),
                                   loss=SparseCategoricalCrossentropy(),
                                   metrics=['accuracy'])
    
            def train(self, x_train, y_train, epochs=5):
                self.model.fit(x_train, y_train, epochs=epochs)
    
            def evaluate(self, x_test, y_test):
                return self.model.evaluate(x_test, y_test)
    
            def predict(self, x):
                return self.model.predict(x)
    
        # Example usage
        if __name__ == "__main__":
            (x_train, y_train), (x_test, y_test) = mnist.load_data()
            x_train, x_test = x_train / 255.0, x_test / 255.0
            mnist_model = MNISTModel()
            mnist_model.train(x_train, y_train)
            test_loss, test_acc = mnist_model.evaluate(x_test, y_test)
            predictions = mnist_model.predict(x_test[:5])
        `,
        "tags": ["Python", "TensorFlow", "Keras", "Machine Learning Frameworks", "Neural Networks"],
        "link": "https://github.com/tensorflow/tensorflow/blob/main/tensorflow/python/keras/models.py",
        "lnum": "1",
        "description": "TensorFlow: End-to-end open-source platform for machine learning."
    },
    
    {
        "snippet_id": 36,
        "code": `from tensorflow.keras.datasets import mnist
    from tensorflow.keras.models import Sequential
    from tensorflow.keras.layers import Dense, Flatten
    from tensorflow.keras.optimizers import Adam
    from tensorflow.keras.utils import to_categorical
    
    # Load MNIST dataset
    (x_train, y_train), (x_test, y_test) = mnist.load_data()
    
    # Normalize images to the range of 0 to 1
    x_train = x_train / 255.0
    x_test = x_test / 255.0
    
    # One-hot encode labels
    y_train = to_categorical(y_train, 10)
    y_test = to_categorical(y_test, 10)
    
    # Build the model
    model = Sequential([
        Flatten(input_shape=(28, 28)),
        Dense(128, activation='relu'),
        Dense(10, activation='softmax')
    ])
    
    # Compile the model
    model.compile(optimizer=Adam(),
                  loss='categorical_crossentropy',
                  metrics=['accuracy'])
    
    # Train the model
    model.fit(x_train, y_train, epochs=5, batch_size=32, validation_data=(x_test, y_test))`,
        "tags": ["Python", "TensorFlow", "Keras", "MNIST", "Neural Networks"],
        "link": "https://gist.github.com/carlosedp/295c9609f8c438b8b5a86d74202a3901",
        "lnum": "1",
        "description": "TensorFlow 2 MNIST classification example."
    },
    {
        "snippet_id": 37,
        "code": `import torch
    import torch.nn as nn
    import torch.optim as optim
    import torchvision
    import torchvision.transforms as transforms
    
    # Define a simple CNN model
    class SimpleCNN(nn.Module):
        def __init__(self):
            super(SimpleCNN, self).__init__()
            self.conv1 = nn.Conv2d(1, 32, kernel_size=3, stride=1, padding=1)
            self.conv2 = nn.Conv2d(32, 64, kernel_size=3, stride=1, padding=1)
            self.fc1 = nn.Linear(64 * 7 * 7, 128)
            self.fc2 = nn.Linear(128, 10)
            self.pool = nn.MaxPool2d(kernel_size=2, stride=2)
            self.relu = nn.ReLU()
    
        def forward(self, x):
            x = self.pool(self.relu(self.conv1(x)))
            x = self.pool(self.relu(self.conv2(x)))
            x = x.view(-1, 64 * 7 * 7)
            x = self.relu(self.fc1(x))
            x = self.fc2(x)
            return x
    
    # Load MNIST dataset
    transform = transforms.Compose([
        transforms.ToTensor(),
        transforms.Normalize((0.5,), (0.5,))
    ])
    
    trainset = torchvision.datasets.MNIST(root='./data', train=True,
                                          download=True, transform=transform)
    trainloader = torch.utils.data.DataLoader(trainset, batch_size=64,
                                              shuffle=True)
    
    testset = torchvision.datasets.MNIST(root='./data', train=False,
                                         download=True, transform=transform)
    testloader = torch.utils.data.DataLoader(testset, batch_size=64,
                                             shuffle=False)
    
    # Initialize the model, loss function, and optimizer
    model = SimpleCNN()
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=0.001)
    
    # Training loop
    for epoch in range(5):  # Number of epochs
        running_loss = 0.0
        for i, data in enumerate(trainloader, 0):
            inputs, labels = data
            optimizer.zero_grad()
            outputs = model(inputs)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()
            running_loss += loss.item()
            if i % 100 == 99:    # Print every 100 mini-batches
                print(f'Epoch {epoch + 1}, Batch {i + 1}, Loss: {running_loss / 100:.3f}')
                running_loss = 0.0
    
    print('Finished Training')`,
        "tags": ["Python", "PyTorch", "CNN", "MNIST", "Deep Learning"],
        "link": "https://github.com/mbjoseph/pytorch-mnist/blob/master/cnn-mnist.ipynb",
        "lnum": "1",
        "description": "PyTorch implementation of a CNN for MNIST."
    },
    {
        "snippet_id": 38,
        "code": `from flask import Flask, request, jsonify
    
    app = Flask(__name__)
    
    @app.route('/api/greet', methods=['GET'])
    def greet():
        name = request.args.get('name', 'World')
        return jsonify(message=f'Hello, {name}!')
    
    @app.route('/api/add', methods=['POST'])
    def add():
        data = request.get_json()
        result = data.get('a', 0) + data.get('b', 0)
        return jsonify(result=result)
    
    if __name__ == '__main__':
        app.run(debug=True)`,
        "tags": ["Python", "Flask", "API", "Web Development", "JSON"],
        "link": "https://github.com/pallets/flask/blob/main/examples/tutorial/flaskr/__init__.py",
        "lnum": "1",
        "description": "Flask API with basic GET and POST endpoints."
    },
    {
        "snippet_id": 39,
        "code": `package main
    
    import (
        "fmt"
        "net/http"
    )
    
    func helloHandler(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Hello, World!")
    }
    
    func main() {
        http.HandleFunc("/", helloHandler)
        fmt.Println("Server is running on port 8080...")
        http.ListenAndServe(":8080", nil)
    }`,
        "tags": ["Go", "Web Development", "HTTP", "Server", "Networking"],
        "link": "https://github.com/golang/go/blob/master/src/net/http/server.go",
        "lnum": "1",
        "description": "Basic HTTP server in Go."
    },
    
    {
        "snippet_id": 40,
        "code": `const express = require('express');
    const app = express();
    
    app.use(express.json());
    
    app.get('/api/hello', (req, res) => {
        res.json({ message: 'Hello, World!' });
    });
    
    app.post('/api/sum', (req, res) => {
        const { a, b } = req.body;
        res.json({ result: a + b });
    });
    
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(\`Server is running on port \${PORT}\`);
    });`,
        "tags": ["JavaScript", "Node.js", "Express.js", "API", "Web Development"],
        "link": "https://github.com/expressjs/express/blob/main/examples/hello-world/index.js",
        "lnum": "1",
        "description": "Basic Express.js server with GET and POST endpoints."
    },
    {
        "snippet_id": 41,
        "code": `import java.sql.Connection;
    import java.sql.DriverManager;
    import java.sql.PreparedStatement;
    import java.sql.ResultSet;
    
    public class DatabaseConnector {
        private static final String URL = "jdbc:mysql://localhost:3306/testdb";
        private static final String USER = "root";
        private static final String PASSWORD = "password";
    
        public static void main(String[] args) {
            try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD)) {
                String query = "SELECT id, name FROM users";
                try (PreparedStatement stmt = conn.prepareStatement(query);
                     ResultSet rs = stmt.executeQuery()) {
                    while (rs.next()) {
                        System.out.println("ID: " + rs.getInt("id") + ", Name: " + rs.getString("name"));
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }`,
        "tags": ["Java", "MySQL", "Database", "JDBC", "SQL"],
        "link": "https://github.com/mysql/mysql-server/blob/main/sql/sql_select.cc",
        "lnum": "1",
        "description": "Java JDBC example for connecting to MySQL."
    },
    {
        "snippet_id": 42,
        "code": `import tensorflow as tf
    from tensorflow import keras
    from tensorflow.keras import layers
    
    # Define a sequential model
    model = keras.Sequential([
        layers.Dense(128, activation='relu', input_shape=(784,)),
        layers.Dropout(0.2),
        layers.Dense(64, activation='relu'),
        layers.Dropout(0.2),
        layers.Dense(10, activation='softmax')
    ])
    
    # Compile the model
    model.compile(optimizer='adam',
                  loss='sparse_categorical_crossentropy',
                  metrics=['accuracy'])
    
    # Display model summary
    print(model.summary())
    
    # Load sample dataset
    (x_train, y_train), (x_test, y_test) = keras.datasets.mnist.load_data()
    x_train, x_test = x_train.reshape(-1, 784) / 255.0, x_test.reshape(-1, 784) / 255.0
    
    # Train the model
    model.fit(x_train, y_train, epochs=5, validation_data=(x_test, y_test))
    
    # Evaluate model performance
    test_loss, test_acc = model.evaluate(x_test, y_test, verbose=2)
    print(f"Test Accuracy: {test_acc}")`,
        "tags": ["Python", "TensorFlow", "Neural Networks", "Machine Learning", "Deep Learning"],
        "link": "https://github.com/tensorflow/tensorflow/blob/main/tensorflow/python/keras/models.py",
        "lnum": "1",
        "description": "MNIST classifier using TensorFlow and Keras."
    },
    {
        "snippet_id": 43,
        "code": `version: "3.8"
    
    services:
      web:
        image: nginx:latest
        container_name: nginx_server
        ports:
          - "80:80"
        volumes:
          - ./html:/usr/share/nginx/html
          - ./nginx.conf:/etc/nginx/nginx.conf
        depends_on:
          - app
        networks:
          - app_network
    
      app:
        image: node:latest
        container_name: node_app
        working_dir: /usr/src/app
        volumes:
          - .:/usr/src/app
        environment:
          - NODE_ENV=production
        command: "node server.js"
        depends_on:
          - db
        networks:
          - app_network
    
      db:
        image: postgres:latest
        container_name: postgres_db
        restart: always
        environment:
          POSTGRES_USER: user
          POSTGRES_PASSWORD: password
          POSTGRES_DB: mydatabase
        volumes:
          - pgdata:/var/lib/postgresql/data
        networks:
          - app_network
    
    networks:
      app_network:
        driver: bridge
    
    volumes:
      pgdata:`,
        "tags": ["Docker", "YAML", "PostgreSQL", "DevOps", "Microservices"],
        "link": "https://github.com/docker/compose/blob/main/examples/nginx-postgres/docker-compose.yml",
        "lnum": "1",
        "description": "Multi-container setup using Docker Compose."
    },
    {
        "snippet_id": 44,
        "code": `const http = require('http');
    const url = require('url');
    
    const server = http.createServer((req, res) => {
        const parsedUrl = url.parse(req.url, true);
        
        if (parsedUrl.pathname === '/api/greet' && req.method === 'GET') {
            const name = parsedUrl.query.name || 'World';
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: \`Hello, \${name}!\` }));
        } else if (parsedUrl.pathname === '/api/time' && req.method === 'GET') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ time: new Date().toISOString() }));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Not Found' }));
        }
    });
    
    const PORT = 8080;
    server.listen(PORT, () => {
        console.log(\`Server running at http://localhost:\${PORT}/\`);
    });`,
        "tags": ["JavaScript", "Node.js", "HTTP", "Web Development", "Networking"],
        "link": "https://github.com/nodejs/node/blob/main/lib/http.js",
        "lnum": "1",
        "description": "Node.js HTTP server with API endpoints."
    },
    
    {
        "snippet_id": 45,
        "code": `import os
    from flask import Flask, request, jsonify
    from flask_sqlalchemy import SQLAlchemy
    
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db = SQLAlchemy(app)
    
    class User(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        username = db.Column(db.String(80), unique=True, nullable=False)
        email = db.Column(db.String(120), unique=True, nullable=False)
    
        def to_dict(self):
            return {"id": self.id, "username": self.username, "email": self.email}
    
    @app.route('/users', methods=['GET'])
    def get_users():
        users = User.query.all()
        return jsonify([user.to_dict() for user in users])
    
    @app.route('/users', methods=['POST'])
    def create_user():
        data = request.json
        new_user = User(username=data['username'], email=data['email'])
        db.session.add(new_user)
        db.session.commit()
        return jsonify(new_user.to_dict()), 201
    
    @app.route('/users/<int:id>', methods=['PUT'])
    def update_user(id):
        user = User.query.get_or_404(id)
        data = request.json
        user.username = data.get('username', user.username)
        user.email = data.get('email', user.email)
        db.session.commit()
        return jsonify(user.to_dict())
    
    @app.route('/users/<int:id>', methods=['DELETE'])
    def delete_user(id):
        user = User.query.get_or_404(id)
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": "User deleted"}), 204
    
    if __name__ == '__main__':
        db.create_all()
        app.run(debug=True)`,
        "tags": ["Python", "Flask", "API", "SQLAlchemy", "Backend"],
        "link": "https://github.com/pallets/flask/blob/main/examples/tutorial/flaskr/__init__.py",
        "lnum": "1",
        "description": "Flask REST API with SQLite database."
    },
    {
        "snippet_id": 46,
        "code": `from pyspark.sql import SparkSession
    from pyspark.sql.functions import col, avg
    
    spark = SparkSession.builder \
        .appName("Spark DataFrame Example") \
        .getOrCreate()
    
    data = [
        ("Alice", 25, "Engineering"),
        ("Bob", 30, "HR"),
        ("Charlie", 35, "Engineering"),
        ("David", 40, "HR"),
        ("Eve", 29, "Finance"),
        ("Frank", 33, "Finance")
    ]
    
    columns = ["Name", "Age", "Department"]
    
    df = spark.createDataFrame(data, columns)
    
    print("Original DataFrame:")
    df.show()
    
    print("Filtering employees older than 30:")
    df.filter(col("Age") > 30).show()
    
    print("Average age per department:")
    df.groupBy("Department").agg(avg("Age").alias("Average Age")).show()
    
    print("Sorting by age:")
    df.orderBy(col("Age").desc()).show()
    
    print("Selecting specific columns:")
    df.select("Name", "Age").show()`,
        "tags": ["Python", "Apache Spark", "Data Processing", "Big Data", "Analytics"],
        "link": "https://github.com/apache/spark/blob/main/examples/src/main/python/sql/basic.py",
        "lnum": "1",
        "description": "Data processing with Apache Spark DataFrames."
    },
    {
        "snippet_id": 47,
        "code": `import threading
    import time
    
    class WorkerThread(threading.Thread):
        def __init__(self, name, delay):
            super().__init__()
            self.name = name
            self.delay = delay
    
        def run(self):
            print(f"Starting thread {self.name}")
            for i in range(5):
                time.sleep(self.delay)
                print(f"{self.name} working... step {i + 1}")
            print(f"Thread {self.name} finished execution.")
    
    def main():
        thread1 = WorkerThread("Worker-1", 1)
        thread2 = WorkerThread("Worker-2", 2)
    
        thread1.start()
        thread2.start()
    
        thread1.join()
        thread2.join()
    
        print("All threads completed execution.")
    
    if __name__ == "__main__":
        main()`,
        "tags": ["Python", "Multithreading", "Concurrency", "Parallel Computing", "OOP"],
        "link": "https://github.com/python/cpython/blob/main/Lib/threading.py",
        "lnum": "1",
        "description": "Multithreading example using Python's threading module."
    },
    
    {
        "snippet_id": 48,
        "code": `package main
    
    import (
        "fmt"
        "log"
        "net/http"
    )
    
    func helloHandler(w http.ResponseWriter, r *http.Request) {
        if r.URL.Path != "/" {
            http.Error(w, "404 not found.", http.StatusNotFound)
    return
  }

        if r.Method != "GET" {
            http.Error(w, "Method not supported.", http.StatusNotFound)
            return
        }
    
        fmt.Fprintf(w, "Hello, World!")
    }
    
    func aboutHandler(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "About Page: Go Web Server Example")
    }
    
    func main() {
        http.HandleFunc("/", helloHandler)
        http.HandleFunc("/about", aboutHandler)
    
        fmt.Println("Starting server at port 8080...")
        if err := http.ListenAndServe(":8080", nil); err != nil {
            log.Fatal(err)
        }
    }`,
        "tags": ["Go", "Backend", "Microservices", "Web Server", "Finance"],
        "link": "https://github.com/golang/go/blob/main/src/net/http/server.go",
        "lnum": "1",
        "description": "A simple Go web server using net/http."
    },
    
    {
        "snippet_id": 49,
        "code": `import mysql.connector
    
    config = {
        "user": "root",
        "password": "password",
        "host": "localhost",
        "database": "ecommerce_db",
    }
    
    try:
        connection = mysql.connector.connect(**config)
        cursor = connection.cursor()
    
        create_table_query = """
        CREATE TABLE IF NOT EXISTS products (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            price DECIMAL(10,2) NOT NULL,
            stock INT NOT NULL
        );
        """
        cursor.execute(create_table_query)
        connection.commit()
    
        insert_query = "INSERT INTO products (name, price, stock) VALUES (%s, %s, %s)"
        products = [
            ("Laptop", 999.99, 10),
            ("Smartphone", 499.50, 25),
            ("Headphones", 79.99, 50),
        ]
        cursor.executemany(insert_query, products)
        connection.commit()
    
        cursor.execute("SELECT * FROM products")
        for row in cursor.fetchall():
            print(row)
    
    except mysql.connector.Error as err:
        print(f"Error: {err}")
    
    finally:
        cursor.close()
        connection.close()`,
        "tags": ["Python", "MySQL", "Database Script", "E-commerce", "Backend"],
        "link": "https://github.com/mysql/mysql-server/blob/main/sql/sql_table.cc",
        "lnum": "1",
        "description": "Python script to manage MySQL database for an e-commerce system."
    },
    
    {
        "snippet_id": 50,
        "code": `from flask import Flask, jsonify
    import random
    
    app = Flask(__name__)
    
    weather_data = [
        {"city": "New York", "temperature": 22, "condition": "Sunny"},
        {"city": "Los Angeles", "temperature": 25, "condition": "Cloudy"},
        {"city": "Chicago", "temperature": 18, "condition": "Rainy"},
        {"city": "Houston", "temperature": 30, "condition": "Humid"},
        {"city": "Phoenix", "temperature": 35, "condition": "Hot"},
    ]
    
    @app.route("/weather", methods=["GET"])
    def get_weather():
        return jsonify(random.choice(weather_data))
    
    if __name__ == "__main__":
        app.run(debug=True)`,
        "tags": ["Python", "Flask", "API", "Weather", "IoT"],
        "link": "https://github.com/moby/moby/blob/main/contrib/flask_app.py",
        "lnum": "1",
        "description": "Flask-based weather API for IoT applications."
    },
    {
        "snippet_id": 51,
        "code": `import os
    import cv2
    import numpy as np
    
    def preprocess_image(image_path):
        image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
        image = cv2.GaussianBlur(image, (5, 5), 0)
        _, image = cv2.threshold(image, 127, 255, cv2.THRESH_BINARY)
        return image
    
    def detect_edges(image):
        edges = cv2.Canny(image, 100, 200)
        return edges
    
    def process_directory(directory_path):
        for filename in os.listdir(directory_path):
            if filename.endswith(".jpg") or filename.endswith(".png"):
                img_path = os.path.join(directory_path, filename)
                img = preprocess_image(img_path)
                edges = detect_edges(img)
                cv2.imwrite(f"processed_{filename}", edges)
    
    if __name__ == "__main__":
        input_dir = "images"
        process_directory(input_dir)`,
        "tags": ["Python", "OpenCV", "Image Processing", "Healthcare", "Computer Vision"],
        "link": "https://github.com/opencv/opencv/blob/master/modules/imgproc/src/canny.cpp",
        "lnum": "1",
        "description": "Image processing and edge detection with OpenCV."
    },
    {
        "snippet_id": 52,
        "code": `import requests
    
    class StockAPI:
        BASE_URL = "https://api.example.com/stocks"
    
        def get_stock_price(self, symbol):
            response = requests.get(f"{self.BASE_URL}/{symbol}")
            if response.status_code == 200:
                return response.json()
            return None
    
        def get_market_summary(self):
            response = requests.get(f"{self.BASE_URL}/summary")
            if response.status_code == 200:
                return response.json()
            return None
    
    if __name__ == "__main__":
        api = StockAPI()
        print(api.get_stock_price("AAPL"))
        print(api.get_market_summary())`,
        "tags": ["Python", "API", "Finance", "Stock Market", "Backend"],
        "link": "https://github.com/quantlib/quantlib/blob/main/ql/pricingengines/blackscholescalculator.hpp",
        "lnum": "1",
        "description": "Stock market API fetching stock prices and market summaries."
    },
    {
        "snippet_id": 53,
        "code": `const express = require("express");
    const mongoose = require("mongoose");
    
    const app = express();
    app.use(express.json());
    
    mongoose.connect("mongodb://localhost:27017/real_estate", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    
    const propertySchema = new mongoose.Schema({
        name: String,
        location: String,
        price: Number,
        type: String
    });
    
    const Property = mongoose.model("Property", propertySchema);
    
    app.post("/properties", async (req, res) => {
        const property = new Property(req.body);
        await property.save();
        res.status(201).send(property);
    });
    
    app.get("/properties", async (req, res) => {
        const properties = await Property.find();
        res.send(properties);
    });
    
    app.listen(3000, () => console.log("Server running on port 3000"));`,
        "tags": ["JavaScript", "Express.js", "MongoDB", "Real Estate", "Backend"],
        "link": "https://github.com/expressjs/express/blob/main/examples/mvc/index.js",
        "lnum": "1",
        "description": "Express.js API for real estate property listings."
    },
    
    {
        "snippet_id": 54,
        "code": `from fastapi import FastAPI, HTTPException
    from pydantic import BaseModel
    from typing import List
    
    app = FastAPI()
    
    class Product(BaseModel):
        id: int
        name: str
        price: float
        stock: int
    
    products = [
        Product(id=1, name="Laptop", price=1200.99, stock=10),
        Product(id=2, name="Smartphone", price=799.49, stock=15),
    ]
    
    @app.get("/products", response_model=List[Product])
    def get_products():
        return products
    
    @app.post("/products", response_model=Product)
    def create_product(product: Product):
        products.append(product)
        return product
    
    @app.delete("/products/{product_id}")
    def delete_product(product_id: int):
        global products
        products = [p for p in products if p.id != product_id]
        return {"message": "Product deleted"}`,
        "tags": ["Python", "FastAPI", "E-commerce", "Microservices", "Backend"],
        "link": "https://github.com/tiangolo/fastapi/blob/main/examples/products.py",
        "lnum": "1",
        "description": "FastAPI-based microservice for managing e-commerce products."
    },
    
    {
        "snippet_id": 55,
        "code": `import pandas as pd
    
    data = {
        "Date": ["2023-01-01", "2023-01-02", "2023-01-03"],
        "Sales": [100, 150, 200],
        "Category": ["Electronics", "Clothing", "Grocery"]
    }
    
    df = pd.DataFrame(data)
    df["Date"] = pd.to_datetime(df["Date"])
    
    print("Sales DataFrame:")
    print(df)
    
    sales_summary = df.groupby("Category").sum()
    print("Sales Summary by Category:")
    print(sales_summary)
    
    df["Rolling_Avg"] = df["Sales"].rolling(window=2).mean()
    print("Sales with Rolling Average:")
    print(df)`,
        "tags": ["Python", "Pandas", "Retail", "Data Processing", "Analytics"],
        "link": "https://github.com/pandas-dev/pandas/blob/main/pandas/core/frame.py",
        "lnum": "1",
        "description": "Retail sales data processing using Pandas."
    },
    
    {
        "snippet_id": 56,
        "code": `package com.example.logistics;
    
    import java.util.ArrayList;
    import java.util.List;
    
    class Vehicle {
        String id;
        int capacity;
    
        public Vehicle(String id, int capacity) {
            this.id = id;
            this.capacity = capacity;
        }
    }
    
    class Package {
        String id;
        int weight;
    
        public Package(String id, int weight) {
            this.id = id;
            this.weight = weight;
        }
    }
    
    class LogisticsSystem {
        List<Vehicle> vehicles = new ArrayList<>();
        List<Package> packages = new ArrayList<>();
    
        public void addVehicle(String id, int capacity) {
            vehicles.add(new Vehicle(id, capacity));
        }
    
        public void addPackage(String id, int weight) {
            packages.add(new Package(id, weight));
        }
    
        public void assignPackages() {
            for (Vehicle vehicle : vehicles) {
                System.out.println("Assigning packages to vehicle: " + vehicle.id);
            }
        }
    }
    
    public class LogisticsApp {
        public static void main(String[] args) {
            LogisticsSystem logistics = new LogisticsSystem();
            logistics.addVehicle("Truck1", 500);
            logistics.addVehicle("Van1", 200);
            
            logistics.addPackage("PKG1", 100);
            logistics.addPackage("PKG2", 50);
            
            logistics.assignPackages();
        }
    }`,
        "tags": ["Java", "Logistics/Transportation", "OOP", "Backend", "Microservices"],
        "link": "https://github.com/apache/camel/blob/main/core/camel-base/src/main/java/org/apache/camel/support/LogHelper.java",
        "lnum": "1",
        "description": "Logistics system managing vehicles and package assignments."
    },
    {
        "snippet_id": 57,
        "code": `import tensorflow as tf
    from tensorflow.keras import layers
    
    class SimpleCNN(tf.keras.Model):
        def __init__(self):
            super(SimpleCNN, self).__init__()
            self.conv1 = layers.Conv2D(32, (3, 3), activation='relu')
            self.pool = layers.MaxPooling2D((2, 2))
            self.conv2 = layers.Conv2D(64, (3, 3), activation='relu')
            self.flatten = layers.Flatten()
            self.fc1 = layers.Dense(128, activation='relu')
            self.fc2 = layers.Dense(10, activation='softmax')
    
        def call(self, x):
            x = self.conv1(x)
            x = self.pool(x)
            x = self.conv2(x)
            x = self.pool(x)
            x = self.flatten(x)
            x = self.fc1(x)
            return self.fc2(x)
    
    model = SimpleCNN()
    dummy_input = tf.random.normal([1, 28, 28, 1])
    output = model(dummy_input)
    print(output)`,
        "tags": ["Python", "TensorFlow", "Healthcare", "Machine Learning Models", "Deep Learning"],
        "link": "https://github.com/tensorflow/models/blob/main/official/vision/beta/projects/simple_cnn.py",
        "lnum": "1",
        "description": "Simple CNN model using TensorFlow for healthcare imaging."
    },
    
    
    {
        "snippet_id": 58,
        "code": `import numpy as np
    import matplotlib.pyplot as plt
    
    # Simulated crop growth data
    days = np.array([0, 10, 20, 30, 40, 50, 60, 70])
    growth_rate = np.array([0, 2, 5, 9, 15, 22, 30, 40])
    
    plt.plot(days, growth_rate, marker='o', linestyle='-')
    plt.xlabel("Days")
    plt.ylabel("Growth Rate")
    plt.title("Crop Growth Over Time")
    plt.grid(True)
    plt.show()
    
    # Polynomial regression model
    from numpy.polynomial import Polynomial
    poly_model = Polynomial.fit(days, growth_rate, 2)
    
    predicted = poly_model(days)
    plt.plot(days, growth_rate, 'o', label='Observed')
    plt.plot(days, predicted, '-', label='Predicted')
    plt.legend()
    plt.show()`,
        "tags": ["Python", "Matplotlib", "Agriculture", "Data Processing", "Regression"],
        "link": "https://github.com/matplotlib/matplotlib/blob/main/lib/matplotlib/pyplot.py",
        "lnum": "1",
        "description": "Crop growth prediction using regression and Matplotlib."
    },
    
    {
        "snippet_id": 59,
        "code": `const WebSocket = require('ws');
    
    const server = new WebSocket.Server({ port: 8080 });
    
    server.on('connection', ws => {
        console.log('New client connected');
        
        ws.on('message', message => {
            console.log('Received:', message);
            ws.send('Echo: ' + message);
        });
    
        ws.on('close', () => {
            console.log('Client disconnected');
        });
    });
    
    console.log('WebSocket server running on ws://localhost:8080');`,
        "tags": ["JavaScript", "WebSockets", "Entertainment/Media", "Event-driven", "Backend"],
        "link": "https://github.com/websockets/ws/blob/main/lib/websocket-server.js",
        "lnum": "1",
        "description": "WebSocket server handling real-time messaging."
    },
    {
        "snippet_id": 60,
        "code": `/**
     * This class is responsible for handling the submission process.
     * It manages the flow of control through the various submission steps.
     */
    public class SubmissionController {
    
        private SubmissionService submissionService;
    
        public SubmissionController(SubmissionService submissionService) {
            this.submissionService = submissionService;
        }
    
        /**
         * Initiates the submission process for a given item.
         *
         * @param itemId The ID of the item to be submitted.
         */
        public void startSubmission(int itemId) {
            submissionService.initiateSubmission(itemId);
        }
    
        /**
         * Advances the submission process to the next step.
         *
         * @param submissionId The ID of the current submission.
         */
        public void advanceSubmission(int submissionId) {
            submissionService.advanceToNextStep(submissionId);
        }
    
        /**
         * Completes the submission process.
         *
         * @param submissionId The ID of the submission to complete.
         */
        public void completeSubmission(int submissionId) {
            submissionService.finalizeSubmission(submissionId);
        }
    }`,
        "tags": ["Java", "Backend", "OOP", "MVC", "Education"],
        "link": "https://github.com/DSpace/DSpace/blob/main/dspace-api/src/main/java/org/dspace/submit/SubmissionController.java",
        "lnum": "1",
        "description": "DSpace: Open source repository software for managing digital content."
    },
    {
        "snippet_id": 61,
        "code": `import pandas as pd
    import numpy as np
    
    class DataFrameHandler:
        def __init__(self, data):
            self.df = pd.DataFrame(data)
    
        def add_column(self, column_name, data):
            self.df[column_name] = data
    
        def remove_column(self, column_name):
            self.df.drop(columns=[column_name], inplace=True)
    
        def get_statistics(self):
            return self.df.describe()
    
        def fill_missing_values(self, value):
            self.df.fillna(value, inplace=True)`,
        "tags": ["Python", "Pandas", "Data Structures", "OOP", "Data Manipulation"],
        "link": "https://github.com/pandas-dev/pandas/blob/main/pandas/core/frame.py",
        "lnum": "1",
        "description": "Pandas: Python library for data manipulation and analysis."
    },
    {
        "snippet_id": 62,
        "code": `const express = require('express');
    const app = express();
    
    app.use(express.json());
    
    app.get('/api/items', (req, res) => {
        res.json({ message: 'Fetching all items' });
    });
    
    app.post('/api/items', (req, res) => {
        const newItem = req.body;
        res.json({ message: 'Item created', item: newItem });
    });
    
    app.put('/api/items/:id', (req, res) => {
        const { id } = req.params;
        const updatedItem = req.body;
        res.json({ message: 'Item updated', id, item: updatedItem });
    });
    
    app.delete('/api/items/:id', (req, res) => {
        const { id } = req.params;
        res.json({ message: 'Item deleted', id });
    });`,
        "tags": ["JavaScript", "Node.js", "Express.js", "API", "Backend"],
        "link": "https://github.com/expressjs/express/blob/master/examples/route-separation/index.js",
        "lnum": "1",
        "description": "Express: Fast, unopinionated, minimalist web framework for Node.js."
    },
    
    {
        "snippet_id": 63,
        "code": `import tensorflow as tf
    
    class SimpleNeuralNetwork(tf.keras.Model):
        def __init__(self):
            super(SimpleNeuralNetwork, self).__init__()
            self.dense1 = tf.keras.layers.Dense(128, activation='relu')
            self.dense2 = tf.keras.layers.Dense(64, activation='relu')
            self.output_layer = tf.keras.layers.Dense(10, activation='softmax')
    
        def call(self, inputs):
            x = self.dense1(inputs)
            x = self.dense2(x)
            return self.output_layer(x)
    
    # Instantiate and compile the model
    model = SimpleNeuralNetwork()
    model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
    
    # Summary of the model
    model.summary()`,
        "tags": ["Python", "TensorFlow", "Machine Learning Models", "OOP", "Neural Networks"],
        "link": "https://github.com/tensorflow/tensorflow/blob/master/tensorflow/python/keras/models.py",
        "lnum": "1",
        "description": "TensorFlow: Open-source machine learning framework for numerical computation."
    },
    {
        "snippet_id": 64,
        "code": `import numpy as np
    
    class MatrixOperations:
        def __init__(self, matrix):
            self.matrix = np.array(matrix)
    
        def transpose(self):
            return np.transpose(self.matrix)
    
        def determinant(self):
            return np.linalg.det(self.matrix)
    
        def inverse(self):
            return np.linalg.inv(self.matrix)
    
        def eigenvalues(self):
            return np.linalg.eigvals(self.matrix)
    
    # Example usage
    matrix = [[4, 7], [2, 6]]
    operations = MatrixOperations(matrix)
    print("Transpose:\\n", operations.transpose())
    print("Determinant:", operations.determinant())
    print("Inverse:\\n", operations.inverse())
    print("Eigenvalues:", operations.eigenvalues())`,
        "tags": ["Python", "NumPy", "Data Structures", "Linear Algebra", "OOP"],
        "link": "https://github.com/numpy/numpy/blob/main/numpy/linalg/linalg.py",
        "lnum": "1",
        "description": "NumPy: Fundamental package for scientific computing with Python."
    },
    {
        "snippet_id": 65,
        "code": `import matplotlib.pyplot as plt
    import numpy as np
    
    class SineWavePlotter:
        def __init__(self, frequency, amplitude, duration):
            self.frequency = frequency
            self.amplitude = amplitude
            self.duration = duration
            self.time = np.linspace(0, duration, 1000)
            self.signal = self.amplitude * np.sin(2 * np.pi * self.frequency * self.time)
    
        def plot(self):
            plt.figure(figsize=(10, 4))
            plt.plot(self.time, self.signal)
            plt.title(f'Sine Wave: {self.frequency}Hz')
            plt.xlabel('Time (s)')
            plt.ylabel('Amplitude')
            plt.grid(True)
            plt.show()
    
    # Example usage
    plotter = SineWavePlotter(frequency=5, amplitude=1, duration=2)
    plotter.plot()`,
        "tags": ["Python", "Matplotlib", "Data Visualization", "Signal Processing", "OOP"],
        "link": "https://github.com/matplotlib/matplotlib/blob/main/lib/matplotlib/pyplot.py",
        "lnum": "1",
        "description": "Matplotlib: Comprehensive library for creating static, animated, and interactive visualizations in Python."
    },
    
    {
        "snippet_id": 66,
        "code": `esphome:
      name: livingroom_light
      platform: ESP32
      board: esp32dev
    
    wifi:
      ssid: "your-SSID"
      password: "your-PASSWORD"
    
    # Enable logging
    logger:
    
    # Enable Home Assistant API
    api:
    
    ota:
    
    light:
      - platform: gpio
        pin: 25
        name: "Living Room Light"`,
        "tags": ["YAML", "ESPHome", "IoT", "Home Automation", "Configuration"],
        "link": "https://github.com/esphome/esphome/blob/dev/esphome/components/light/gpio/__init__.py",
        "lnum": "1",
        "description": "ESPHome: System to control ESP8266/ESP32 devices via configuration files."
    },
    {
        "snippet_id": 67,
        "code": `#include <Arduino.h>
    #include <WiFi.h>
    #include <ESP32CAM.h>
    
    const char* ssid = "your-SSID";
    const char* password = "your-PASSWORD";
    
    ESP32CAM camera;
    
    void setup() {
      Serial.begin(115200);
      WiFi.begin(ssid, password);
      while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
      }
      Serial.println("WiFi connected");
      camera.init();
    }
    
    void loop() {
      camera.capture();
      delay(1000);
    }`,
        "tags": ["C++", "ESP32", "IoT", "Wi-Fi", "Camera"],
        "link": "https://github.com/ESP32-CAM-WiFi-Car/ESP32-CAM-WiFi-Car/blob/main/src/main.cpp",
        "lnum": "1",
        "description": "ESP32-CAM-WiFi-Car: Remote-controlled car using ESP32-CAM module."
    },
    {
        "snippet_id": 68,
        "code": `#include <nlohmann/json.hpp>
    #include <iostream>
    #include <fstream>
    
    using json = nlohmann::json;
    
    int main() {
        // Read JSON from a file
        std::ifstream input_file("config.json");
        json config;
        input_file >> config;
    
        // Access values
        std::string name = config["name"];
        int age = config["age"];
        std::vector<std::string> hobbies = config["hobbies"];
    
        // Output values
        std::cout << "Name: " << name << "\\n";
        std::cout << "Age: " << age << "\\n";
        std::cout << "Hobbies: ";
        for (const auto& hobby : hobbies) {
            std::cout << hobby << " ";
        }
        std::cout << std::endl;
    
        return 0;
    }`,
        "tags": ["C++", "JSON", "Data Parsing", "File I/O", "nlohmann/json"],
        "link": "https://github.com/nlohmann/json/blob/develop/examples/basic_example.cpp",
        "lnum": "1",
        "description": "JSON for Modern C++: A C++ library for JSON parsing and serialization."
    }
    
    
      
];

// Add this near the top of your script.js with other variables
const availableTags = [
    "JavaScript",
    "Python",
	"TensorFlow",
	"Machine Learning Model",
	"Data Pipeline",
	"Go",
	"Data Visualization",
	"go-echarts",
	"Web Development",
	"Backend",
	"Perl",
	"Web Scraping",
	"LWP",
	"HTML::TreeBuilder",
	"Scripting",
	"Dart",
	"Flutter",
	"Mobile Development",
	"UI",
	"Counter App",
	"MATLAB",
	"Linear Algebra",
	"Systems of Equations",
	"Numerical Computing",
	"Matrix Operations",
	"Rust",
	"Actix-web",
	"HTTP Server",
	"R",
	"Statistics",
	"Linear Regression",
	"Machine Learning",
	"Bash",
	"Database Script",
	"MySQL",
	"Backup",
	"Automation",
	"AI/ML",
	"C++",
	"SFML",
	"Game Development",
	"Graphics",
	"Gaming",
	"C#",
	"LINQ",
	"Arrays",
	"Query",
	"Node.js",
	"Networking",
	"Network Security",
	"Port Scanning",
	"Threading",
	"C",
	"Packet Sniffing",
	"Libpcap",
	"Go",
	"Backend",
	"API",
	"Cloud Computing",
	"Web Server",
	"Java",
	"Spring Boot",
	"REST API",
	"Web Development",
	"C++",
	"Qt",
	"GUI",
	"Desktop Application",
	"Frontend",
	"React",
	"UI",
	"SQL",
	"E-commerce",
	"Retail",
	"Backend",
	"PyTorch",
	"Logistics",
	"Inventory Management",
	"SaaS",
	"Database",
	"E-commerce",
	"Data Analytics"
]; // You can replace these with your actual tags later

// Game state variables
let currentRound = 1;
let totalScore = 0;
let roundScores = [];
let userTags = [];
let currentSnippet = null;
let timeLeft = 90;
let timer = null;
let startTime = 0;
let hintsUsed = 0;
let usedSnippetIds = [];

// DOM Elements - Initialize these after the DOM is loaded
let codeSnippetElement;
let tagsContainer;
let tagInput;
let timerElement;
let roundInfoElement;
let totalScoreElement;
let resultsElement;
let hintDisplay;
let hintText;
let closeHintBtn;

// Initialize the game
window.currentSnippetId = 1;

// Initialize DOM elements and start the game when the page is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize DOM Elements
  codeSnippetElement = document.getElementById("code-snippet");
  tagsContainer = document.getElementById("tags-container");
  tagInput = document.getElementById("tag-input");
  timerElement = document.getElementById("timer");
  roundInfoElement = document.getElementById("round-info");
  totalScoreElement = document.getElementById("total-score");
  resultsElement = document.getElementById("results");
  hintDisplay = document.getElementById("hint-display");
  hintText = document.getElementById("hint-text");
  closeHintBtn = document.getElementById("close-hint");
  
  // Add event listener for closing the hint
  closeHintBtn.addEventListener("click", closeHint);
  
  // Start the game
  startGame();
});

function startGame() {
    if (currentRound > 6) {
        endGame();
        return;
    }

    userTags = []
    tagsContainer.innerHTML = ""
    resultsElement.innerHTML = ""
    tagInput.disabled = false
    tagInput.value = ""
    hintsUsed = 0
    document.getElementById("hint-btn").disabled = false

    // Reset used snippets if starting a new game
    if (currentRound === 1) {
        usedSnippetIds = [];
    }

    // Filter out already used snippets
    const availableSnippets = codeSnippets.filter(snippet => !usedSnippetIds.includes(snippet.snippet_id));
    
    // If we've used all snippets, reset the used snippets array (shouldn't happen in a 6-round game with 10+ snippets)
    if (availableSnippets.length === 0) {
        usedSnippetIds = [];
        currentSnippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
    } else {
        // Select a random snippet from available snippets
        currentSnippet = availableSnippets[Math.floor(Math.random() * availableSnippets.length)];
    }
    
    // Add the selected snippet to used snippets
    usedSnippetIds.push(currentSnippet.snippet_id);
    
    // Store the current snippet ID for reporting issues
    window.currentSnippetId = currentSnippet.snippet_id;

    // Create a container for the code snippet
    const codeContainer = document.createElement('div');
    codeContainer.className = 'code-container';
    
    // Display line numbers and source link if available
    const infoContainer = document.createElement('div');
    infoContainer.className = 'snippet-info';
    
    if (currentSnippet.lnum) {
        const lineInfo = document.createElement('div');
        lineInfo.className = 'line-info';
        lineInfo.textContent = `${currentSnippet.lnum}`;
        infoContainer.appendChild(lineInfo);
    }
    
    if (currentSnippet.link) {
        const linkInfo = document.createElement('div');
        linkInfo.className = 'link-info';
        const linkElement = document.createElement('a');
        linkElement.href = currentSnippet.link;
        linkElement.target = '_blank';
        linkElement.textContent = 'Source Link';
        linkInfo.appendChild(linkElement);
        infoContainer.appendChild(linkInfo);
    }
    
    // Create the pre element for the code
    const preElement = document.createElement('pre');
    preElement.className = 'code-text';
    preElement.textContent = currentSnippet.code;
    
    // Add syntax highlighting based on language
    if (currentSnippet.tags && currentSnippet.tags.includes("JavaScript")) {
        // Apply some basic syntax highlighting for JavaScript
        const highlightedCode = currentSnippet.code
            .replace(/\b(function|return|if|else|for|while|var|let|const|of|in|new|this|class|extends|import|export|from|try|catch|finally|throw|async|await)\b/g, '<span style="color: #c792ea;">$1</span>')
            .replace(/\b(true|false|null|undefined)\b/g, '<span style="color: #f78c6c;">$1</span>')
            .replace(/("[^"]*")|('[^']*')|(`[^`]*`)/g, '<span style="color: #c3e88d;">$1</span>')
            .replace(/\b(\d+)\b/g, '<span style="color: #f78c6c;">$1</span>')
            .replace(/\/\/.*/g, '<span style="color: #546e7a;">$&</span>')
            .replace(/\/\*[\s\S]*?\*\//g, '<span style="color: #546e7a;">$&</span>');
        
        preElement.innerHTML = highlightedCode;
    }
    
    // Assemble the code container
    codeContainer.appendChild(preElement);
    
    // Clear and update the code snippet element
    codeSnippetElement.innerHTML = '';
    codeSnippetElement.appendChild(codeContainer);

    timeLeft = 90 // Set to 90 seconds
    startTime = Date.now()

    timerElement.textContent = `Time Left: ${timeLeft}s`
    updateTimerBar(timeLeft)

    // Update player info, round info, and total score
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (token && user.email) {
        document.getElementById("player-info").textContent = `Email ID:${user.email}`;
    } else {
        document.getElementById("player-info").textContent = `Email ID:Guest`;
    }
    
    document.getElementById("round-info").textContent = `Round:${currentRound}/6`
    document.getElementById("total-score").textContent = `Total Score:${totalScore}`

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

function filterTags() {
    const input = document.getElementById('tag-input');
    const filter = input.value.toLowerCase();
    const dropdown = document.getElementById('tags-dropdown');
    
    // Clear previous suggestions
    dropdown.innerHTML = '';
    
    if (filter.length === 0) {
        dropdown.classList.add('hidden');
        return;
    }

    // Filter tags
    const filteredTags = availableTags.filter(tag => 
        tag.toLowerCase().includes(filter)
    );

    // Show dropdown if we have suggestions
    if (filteredTags.length > 0) {
        dropdown.classList.remove('hidden');
        filteredTags.forEach(tag => {
            const div = document.createElement('div');
            div.className = 'tag-suggestion';
            div.textContent = tag;
            div.onclick = () => selectTag(tag);
            dropdown.appendChild(div);
        });
    } else {
        dropdown.classList.add('hidden');
    }
}

function selectTag(tag) {
    const input = document.getElementById('tag-input');
    input.value = tag;
    document.getElementById('tags-dropdown').classList.add('hidden');
    addTag(); // Automatically add the selected tag
}

// Modify your existing addTag function
function addTag() {
    const tag = tagInput.value.trim();

    if (tag && userTags.length < 5 && !userTags.some(t => t.tag.toLowerCase() === tag.toLowerCase())) {
        userTags.push({ tag, timeAdded: Math.floor((Date.now() - startTime) / 1000) });

        const tagElement = document.createElement("span");
        tagElement.textContent = tag;
        tagElement.className = "tag fade-in";
        tagsContainer.appendChild(tagElement);

        // Clear input and dropdown
        tagInput.value = "";
        document.getElementById('tags-dropdown').classList.add('hidden');
    }

    if (userTags.length >= 5) {
        tagInput.disabled = true;
    }
}

// Add click event listener to close dropdown when clicking outside
document.addEventListener('click', function(e) {
    const dropdown = document.getElementById('tags-dropdown');
    const input = document.getElementById('tag-input');
    
    if (!input.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.add('hidden');
    }
});

function updateTimerBar(timeLeft) {
  const totalDuration = 90
  const percentage = (timeLeft / totalDuration) * 100

  const timerBar = document.getElementById("timer-bar")
  timerBar.style.width = `${percentage}%`

  timerElement.textContent = `Time Left: ${timeLeft}s`
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

  // Create a list of missed tags (tags that were correct but not guessed by the user)
  const missedTags = currentSnippet.tags.filter(tag => 
    !userCorrectTags.includes(tag.toLowerCase())
  );
  
  const missedTagsHtml = missedTags.length > 0 ? 
    `<p>Missed Tags: ${missedTags.join(", ")}</p>` : 
    "";
    
  // Add snippet description if available
  const snippetDescriptionHtml = currentSnippet.description ? 
    `<div class="snippet-description">
      <h3>About this snippet:</h3>
      <p>${currentSnippet.description}</p>
     </div>` : 
    "";

  showResults(`
        <h2>Round ${currentRound} Results</h2>
        <p>Round Score: ${score}</p>
        <p>Total Score: ${totalScore}</p>
        <p>Correct Tags: ${correctTagsHtml}</p>
        ${missedTagsHtml}
        ${snippetDescriptionHtml}
        <div class="results-buttons">
          <button id="report-issue-btn" class="report-issue-btn">Report Issue</button>
          <button id="next-round-btn" class="next-round-btn">Continue to Next Round</button>
        </div>
    `)

  // Add event listener to the Next Round button
  document.getElementById("next-round-btn").addEventListener("click", nextRound);
  
  // Add event listener to the Report Issue button
  document.getElementById("report-issue-btn").addEventListener("click", function() {
    // Show the report modal
    document.getElementById("report-modal").style.display = "flex";
  });

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
  // First show the initial game over screen with a loading leaderboard
  showResults(`
        <h2>Game Over!</h2>
        <p>Total Score: ${totalScore}</p>
        <h3>Round Scores:</h3>
        <ul>
            ${roundScores.map((score, index) => `<li>Round ${index + 1}: ${score}</li>`).join("")}
        </ul>
        
        <!-- Include the leaderboard directly in the results -->
        <div class="leaderboard-container">
            <h2 class="leaderboard-title">Leaderboard</h2>
            <div id="leaderboard-loading">Loading leaderboard data...</div>
            <table class="leaderboard-table" id="leaderboard-table" style="display:none;">
                <thead>
                    <tr>
                        <th class="rank">Rank</th>
                        <th class="player">Player</th>
                        <th class="score">Score</th>
                    </tr>
                </thead>
                <tbody id="results-leaderboard-body">
                    <!-- Leaderboard entries will be populated dynamically -->
                </tbody>
            </table>
            <div id="results-leaderboard-message" class="leaderboard-message hidden">
                <!-- Message will be shown if user is not in top 10 -->
            </div>
        </div>
        
        <div class="results-buttons">
          <button id="give-feedback-btn" class="report-issue-btn">Give Feedback</button>
          <button id="play-again-btn" class="next-round-btn">Play Again</button>
        </div>
    `)
    
  // Add event listener to the Play Again button
  document.getElementById("play-again-btn").addEventListener("click", resetGame);
  
  // Add event listener to the Give Feedback button
  document.getElementById("give-feedback-btn").addEventListener("click", function() {
    window.location.href = '/public/feedback.html';
  });
  
  // Save game session to backend if user is logged in
  const token = localStorage.getItem('token');
  const user = token ? JSON.parse(localStorage.getItem('user') || '{}') : null;
  
  if (token) {
    const roundsData = [];
    for (let i = 0; i < roundScores.length && i < usedSnippetIds.length; i++) {
      roundsData.push({
        snippetId: usedSnippetIds[i], // Use the actual snippet_id instead of index
        correctTags: codeSnippets.find(s => s.snippet_id === usedSnippetIds[i])?.tags.map(tag => tag.toLowerCase()) || [],
        userTags: userTags.map(t => t.tag.toLowerCase()),
        timeSpent: 90 - timeLeft
      });
    }
    
    // Save the game session and then fetch leaderboard
    window.saveGameSession(totalScore, roundsData)
      .then(() => fetchResultsLeaderboard(user));
  } else {
    // Just fetch the leaderboard for guest users
    fetchResultsLeaderboard(null);
  }
}

// Function to fetch and display the leaderboard within the results overlay
async function fetchResultsLeaderboard(user) {
  try {
    const response = await fetch('/api/game/leaderboard?limit=10');
    const data = await response.json();
    
    if (data.success) {
      displayResultsLeaderboard(data.data.scores, user);
    } else {
      document.getElementById('leaderboard-loading').textContent = 'Could not load leaderboard data';
    }
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    document.getElementById('leaderboard-loading').textContent = 'Error loading leaderboard';
  }
}

// Function to display the leaderboard within the results overlay
function displayResultsLeaderboard(scores, user) {
  const leaderboardTable = document.getElementById('leaderboard-table');
  const leaderboardBody = document.getElementById('results-leaderboard-body');
  const leaderboardMessage = document.getElementById('results-leaderboard-message');
  const loadingMessage = document.getElementById('leaderboard-loading');
  
  // Hide loading message
  loadingMessage.style.display = 'none';
  
  // Show the table
  leaderboardTable.style.display = 'table';
  
  // Clear previous content
  leaderboardBody.innerHTML = '';
  leaderboardMessage.innerHTML = '';
  leaderboardMessage.classList.add('hidden');
  
  // Add scores to the table
  scores.forEach((score, index) => {
    const isCurrentUser = user && score.user_id === user.id;
    const row = document.createElement('tr');
    
    if (isCurrentUser) {
      row.classList.add('current-user');
    }
    
    row.innerHTML = `
      <td class="rank">#${index + 1}</td>
      <td class="player">${score.user_email || 'Anonymous'}</td>
      <td class="score">${score.score}</td>
    `;
    
    leaderboardBody.appendChild(row);
  });
  
  // Display message if user is not in top 10
  if (user && !scores.some(score => score.user_id === user.id)) {
    leaderboardMessage.innerHTML = `
      Keep playing to make it to the leaderboard! Your current score: ${totalScore}
    `;
    leaderboardMessage.classList.remove('hidden');
  }
}

function resetGame() {
  currentRound = 1
  totalScore = 0
  roundScores = []
  usedSnippetIds = [] // Reset used snippets for a new game
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

// Make functions available globally
window.addTag = addTag;
window.submitTags = submitTags;
window.nextRound = nextRound;
window.resetGame = resetGame;
window.getHint = getHint;
window.closeHint = closeHint;
window.filterTags = filterTags;
window.selectTag = selectTag;


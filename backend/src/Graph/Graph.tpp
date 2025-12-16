#include "Graph/Graph.h"
#include "Error/ErrorCode.h"
#include <algorithm>
#include <filesystem>
#include <fstream>
#include <sstream>
#include <queue>
#include <map>
#include <limits>

using namespace std;

template <typename T>
string Graph<T>::trim(const string& s) {
    size_t start = s.find_first_not_of(' ');
    if (start == string::npos) return "no label";
    size_t end = s.find_last_not_of(' ');
    return s.substr(start, end - start + 1);
}

template <typename T>
//  тип графа. 0 - ориентир, 1 - неориентир
string Graph<T>::checkType(const string& fileContent) {
    stringstream ss(fileContent);
    string line;

    if (!getline(ss, line)) {
        return "-1";
    }

    stringstream lineStream(line);
    string type;
    lineStream >> type;

    if (type == "directed") {
        return "directed";
    }
    else if (type == "undirected") {
        return "undirected";
    }
    else {
        return "-1";
    }
}

template <typename T>
int Graph<T>::getSize() {
    return this->graph.size();
}

template <typename T>
// конструктор копирования
Graph<T>::Graph(const Graph<T>& other) {
    this->graph = other.graph;
}

template <typename T>
// в Edge
Edge<T> Graph<T>::toEdge(const T& vertex, int weight, std::string label) {
    Edge<T> e(vertex, weight, label);
    return e;
}

template <typename T>
// поиск вершины
bool Graph<T>::hasVertex(const T& value) {
    return this->graph.find(value) != this->graph.end();
};

template <typename T>
// поиск ребра
typename vector<Edge<T>>::iterator Graph<T>::findEdge(const T& value, const T& edge) {
    auto& edges = this->graph[value];
    return find_if(edges.begin(), edges.end(), 
                    [&](const Edge<T> &curEdge) {
        return curEdge.vertex == edge;
        });
    };

template <typename T>  
bool Graph<T>::hasEdge(const T& value, const T& edge) {
    return this->findEdge(value, edge) != this->graph[value].end();
};

template <typename T>
bool Graph<T>::cycledDfs(const T& vertex, map<T, bool>& used, const T& parent) {
    used[vertex] = true;
    for (const auto& edge : this->graph[vertex]) {
        if (edge.vertex == parent) continue;
        if (used[edge.vertex]) return true;
        if (this->cycledDfs(edge.vertex, used, vertex)) return true;
    }
    return false;
}

template <typename T>
bool Graph<T>::hasCycles() {
    map<T, bool> used;
    for (const auto& [vertex, edges] : this->graph) {
        for (const auto& [vertex, edges] : this->graph) {
            used[vertex] = false;
        }
        if (this->cycledDfs(vertex, used)) return true;
    }
    return false;
}

template <typename T>
vector<T> Graph<T>::unreachableBfs(const T& vertex, std::map<T, bool>& used) {
    queue<T> q;
    q.push(vertex);
    used[vertex] = true;

    while (!q.empty()) {
        T cur = q.front();
        q.pop();

        for (const auto& edge : this->graph[cur]) {
            if (used[edge.vertex]) continue;
            q.push(edge.vertex);
            used[edge.vertex] = true;
        }
    }
    vector<T> unreachable;
    for (const auto& [v, isUsed] : used) {
        if (!isUsed) {
            unreachable.push_back(v);
        }
    }
    return unreachable;
}

template <typename T>
vector<T> Graph<T>::findUnreachableVertices(const T& vertex) {
    map<T, bool> used;
    for (const auto& [vertex, edges] : this->graph) {
        used[vertex] = false;
    }
    return this->unreachableBfs(vertex, used);
}

template <typename T>
vector<Edge<T>> Graph<T>::makeEdgesVector() {
    vector<Edge<T>> edges;
    for (const auto& [vertex, edges] : this->graph) {
        edges.push_back(edges);
    }
}

template <typename T>  
// приватный метод добавления вершины
bool Graph<T>::addVertex(const T& value, bool isOriginalRequest) {
    if (this->graph.find(value) != this->graph.end()) {
        return false;
    }
    this->graph[value] = vector<Edge<T>>();
    return true;
};

template <typename T>  
// публичный метод добавления вершины
bool Graph<T>::addVertex(const T& value) {
    return this->addVertex(value, true);
}

template <typename T>  
// приватный метод вывода графа
void Graph<T>::print(ostream& out, string type) {
    this->sortGraph();
    if (type == "dir") out << "0" << '\n';
    else if (type == "undir") out << "1" << '\n';
    for (const auto& [vertex, edges] : this->graph) {
        out << vertex << ": ";
        for (const auto& edge : edges) {
            out << "(" << edge.vertex << ", " << edge.weight << ", " << edge.label << ") ";
        }
        if (edges.empty()) {
            out << "No edges";
        }
        out << '\n';
    }
}

template <typename T>  
// метод вывода графа в консоль
void Graph<T>::printInConsole() {
    if (this->graph.empty()) {
        return;
    }
    this->print(cout, "");
}

template <typename T>  
// метод вывода графа в файл
bool Graph<T>::printInFile(const string& filename, string type) {
    ofstream outFile("data/" + filename, ios::trunc);
    if (!outFile.is_open()) {
        cerr << "[ERROR] Не удалось открыть файл вывода!\n";
        return false;
    }
    this->print(outFile, type);
    outFile.close();
    return true;
}

template <typename T>  
// сортировка графа
void Graph<T>::sortGraph() {
    for (auto& [vertex, edges] : graph) {
        sort(edges.begin(), edges.end(),
          [](const Edge<T>& a, const Edge<T>& b) {
            return a.vertex < b.vertex;
          });
    }
}

// Находит родителя в Union-Find
template <typename T>
T Graph<T>::findParent(T v, map<T, T>& parent) {
    if (parent[v] == v) return v;
    return parent[v] = findParent(parent[v], parent);
}

// Объединяет множества
template <typename T>
void Graph<T>::unite(T a, T b, map<T, T>& parent, map<T, int>& rank) {
    a = findParent(a, parent);
    b = findParent(b, parent);
    if (a != b) {
        if (rank[a] < rank[b]) swap(a, b);
        parent[b] = a;
        if (rank[a] == rank[b]) rank[a]++;
    }
}

// Алгоритм Дейкстры

template <typename T>
map<T, int> Graph<T>::dijkstra(const T& start) {
    const int INF = numeric_limits<int>::max();
    std::map<T, int> dist;

    for (auto& [v, _] : this->graph) {
        dist[v] = INF;
    }
    dist[start] = 0;

    std::priority_queue<pair<int, T>, std::vector<pair<int, T>>, std::greater<pair<int, T>>> pq;
    pq.push({0, start});

    while (!pq.empty()) {
        auto [d, v] = pq.top();
        pq.pop();
        if (d > dist[v]) continue;

        for (auto& edge : this->graph[v]) {
            T to = edge.vertex;
            int w = edge.weight;
            if (dist[v] != INF && dist[v] + w < dist[to]) {
                dist[to] = dist[v] + w;
                pq.push({dist[to], to});
            }
        }
    }
    return dist;
}


// Поиск эксцентриситета, радиуса, центра
template <typename T>
 string Graph<T>::findGraphCenter() {
    const int INF = numeric_limits<int>::max();
    vector<T> vertices;
    for (auto& [v, _] : this->graph) {
        vertices.push_back(v);
    }
    map<T, int> eccentricity;
    // запуск Дейкстры для каждой вершины
    for (const T& start : vertices) {
        auto dist = this->dijkstra(start);
        int ecc = 0;
        for (auto& [v, d] : dist) {
            if (d < INF) ecc = max(ecc, d);
        }
        eccentricity[start] = ecc;
    }

    // радиус и центр
    int radius = numeric_limits<int>::max();
    for (auto& [v, e] : eccentricity) {
        radius = min(radius, e);
    }

    vector<T> center;
    for (auto& [v, e] : eccentricity) {
        if (e == radius) center.push_back(v);
    }

    std::stringstream ss;
    ss << "{";
    ss << "\"eccentricity\":{";
    bool first = true;
    for (auto& [v, e] : eccentricity) {
        if (!first) ss << ",";
        first = false;
        ss << "\"" << v << "\":" << e;
    }
    ss << "},";
    ss << "\"radius\":" << radius << ",";
    ss << "\"center\":[";
    first = true;
    for (auto& c : center) {
        if (!first) ss << ",";
        first = false;
        ss << "\"" << c << "\"";
    }
    ss << "]";
    ss << "}";
    return ss.str();
 }

 // Алгоритм Флойда-Уоршелла
template <typename T>
std::map<T, std::map<T, int>> Graph<T>::floydWarshell() {
    const int INF = std::numeric_limits<int>::max();
    std::map<T, std::map<T, int>> dist;

    // Инициализация: ставим INF для всех пар
    for (auto& [v1, _] : this->graph) {
        for (auto& [v2, _] : this->graph) {
            dist[v1][v2] = (v1 == v2 ? 0 : INF);
        }
    }

    // Заполняем веса существующих рёбер
    for (auto& [v1, e1] : this->graph) {
        for (auto& edge : e1) {
            dist[v1][edge.vertex] = edge.weight;
        }
    }

    // Основной алгоритм Флойда
    for (auto& [v1, e1] : this->graph) {
        for (auto& [v2, e2] : this->graph) {
            for (auto& [v3, e3] : this->graph) {
                if (dist[v2][v1] < INF && dist[v1][v3] < INF) {
                    dist[v2][v3] = std::min(dist[v2][v3], dist[v2][v1] + dist[v1][v3]);
                }
            }
        }
    }
    return dist;
}

// Кратчайшие пути от всех вершин до вершины u
template <typename T>
std::string Graph<T>::shortestPaths(const T& u) {
    map<T, map<T, int>> dist = this->floydWarshell();
    const int INF = numeric_limits<int>::max();
    std::stringstream ss;
    ss << "[";
    bool first = true;

    for (auto& [v, _] : this->graph) {
        int d = dist[v][u];
        if (!first) ss << ",";
        first = false;

        ss << "{";
        ss << "\"source\":\"" << v << "\",";
        ss << "\"target\":\"" << u << "\",";
        if (d < INF)
            ss << "\"distance\":" << d;
        else
            ss << "\"distance\":null"; // недостижимо
        ss << "}";
    }

    ss << "]";
    return ss.str();
}

template <typename T>
string Graph<T>::isNegCycleHere(T start) {
    map<T, int> dist;
    map<T, T> parent;
    vector<T> negCycle;
    bool hasCycle = this->fordBellman(start, dist, parent, negCycle);
    std::stringstream ss;
    ss << "{";
    ss << "\"hasNegCycle\": " << (hasCycle ? "true" : "false") << ",";
    ss << "\"cycle\": [";

    for (size_t i = 0; i < negCycle.size(); ++i) {
        if (i > 0) ss << ",";
        ss << "\"" << negCycle[i] << "\"";
    }

    ss << "]";
    ss << "}";
    return ss.str();
}

// Форд Беллман
template <typename T>
bool Graph<T>::fordBellman(T start, map<T, int>& dist, map<T, T>& parent, vector<T>& negCycle) {
    const int INF = numeric_limits<int>::max();
    dist.clear();
    parent.clear();
    for (auto& [v, _] : this->graph) {
        dist[v] = INF;
        parent[v] = T();
    }
    dist[start] = 0;
    int n = this->graph.size();

    for (int i = 0; i < n - 1; i++) {
        for (auto& [v, e] : this->graph) {
            if (dist[v] == INF) continue;
            for (auto& e0 : e) {
                if (dist[v] + e0.weight < dist[e0.vertex]) {
                    dist[e0.vertex] = dist[v] + e0.weight;
                    parent[e0.vertex] = v;
                }
            }
        }
    }

    // Проверяем на цикл отрицательного веса
    for (auto& [v, edges] : this->graph) {
        if (dist[v] == INF) continue;
        for (auto& e : edges) {
            if (dist[v] + e.weight < dist[e.vertex]) {
                T x = e.vertex;
                for (int i = 0; i < n; ++i) x = parent[x];
                T cur = x;
                negCycle.clear();
                do {
                    negCycle.push_back(cur);
                    cur = parent[cur];
                } while (cur != x);
                std::reverse(negCycle.begin(), negCycle.end());
                return true;
            }
        }
    }
    return false;
}

// преобразование к JSON
template <typename T>
string Graph<T>::toJSON(bool isDirected) {
    stringstream out;
    out << "{\n";
    out << "\"directed\": " << (isDirected ? "true" : "false") << ",\n";
    out << " \"nodes\": [";
    bool firstNode = true;
    for (const auto& [vertex, _] : this->graph) {
        if (vertex == "directed" || vertex == "undirected") continue;
        if (!firstNode) out << ",";
        firstNode = false;
        out << "\n    {\"id\": \"" << vertex << "\"}";
    }
    out << "\n  ],\n";
    out << "  \"edges\": [";

    bool firstEdge = true;
    for (const auto& [from, edges] : this->graph) {
        for (const auto& edge : edges) {
            if (!firstEdge) out << ",";
            firstEdge = false;
            out << "\n    {"
                << "\"source\": \"" << from << "\", "
                << "\"target\": \"" << edge.vertex << "\", "
                << "\"weight\": " << edge.weight << ", "
                << "\"label\": \"" << edge.label << "\""
                << "}";
        }
    }

    out << "\n ]\n";
    out << "}\n";
    return out.str();
}

//  потоковый граф в JSON
template <typename T>
string Graph<T>::toFlowJSON(std::map<T, std::vector<FlowEdge<T>>>& flowGraph, int maxflow) {
    stringstream out;
    out << "{\n";
    out << "  \"graphType\": \"flow\",\n";
    out << "  \"maxflow\": " << maxflow << ",\n";
    // ---------- nodes ----------
    out << "  \"nodes\": [";
    bool firstNode = true;
    for (const auto& [vertex, _] : flowGraph) {
        if (!firstNode) out << ",";
        firstNode = false;
        out << "\n    {\"id\": \"" << vertex << "\"}";
    }
    out << "\n  ],\n";

    // ---------- edges ----------
    out << "  \"edges\": [";
    bool firstEdge = true;

    for (const auto& [from, edges] : flowGraph) {
        for (const auto& edge : edges) {

            if (edge.cap == 0)
                continue;

            if (!firstEdge) out << ",";
            firstEdge = false;

            out << "\n    {"
                << "\"source\": \"" << from << "\", "
                << "\"target\": \"" << edge.to << "\", "
                << "\"capacity\": " << edge.cap << ", "
                << "\"flow\": " << edge.flow
                << "}";
        }
    }

    out << "\n  ]\n";
    out << "}\n";

    return out.str();
}

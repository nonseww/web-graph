#include "Graph/UndirectedGraph.h"
#include <iostream>
#include <algorithm>
#include <set>

using namespace std;

string trim0(const string& s) {
    const string whitespace = " \t\n\r\f\v";
    size_t start = s.find_first_not_of(whitespace);
    if (start == string::npos) return string();
    size_t end = s.find_last_not_of(whitespace);
    return s.substr(start, end - start + 1);
}

template <typename T>
UndirectedGraph<T>::UndirectedGraph(const string fileContent) {
    stringstream file(fileContent);
    string line;
    getline(file, line);
    string type;
    stringstream ss0(line);
    ss0 >> type;
    
    while (getline(file, line)) {
        if (!line.empty()) {
            stringstream ss(line);

            string valueStr;
            getline(ss, valueStr, ':');
            T value = trim0(valueStr);

            this->addVertex(value, true);
            string rest;
            getline(ss, rest);

            if (!rest.empty() && rest.front() == ' ') {
                rest.erase(rest.begin());
            }

            if (rest == "No edges") continue;

            size_t pos = 0;
            while(true) {
                size_t start = rest.find('(', pos);
                if (start == string::npos) break;
                size_t end = rest.find(')', start);
                if (end == string::npos) break;

                string edgeStr = rest.substr(start + 1, end - start - 1);
                pos = end + 1;
                
                stringstream ess(edgeStr);
                string vStr, wStr, label;
                getline(ess, vStr, ',');
                getline(ess, wStr, ',');
                getline(ess, label);

                T vertex = trim(vStr);
                int weight = stoi(trim(wStr));
                label = trim(label);
                this->addEdge(value, this->toEdge(vertex, weight, this->trim(label)));
            }
        }
    }
}

template <typename T>
// добавление ребра по вершине1 и Edge<T>
bool UndirectedGraph<T>::addEdge(const T& value, const Edge<T>& edge) {
    this->addVertex(value, false);
    if (this->hasEdge(value, edge.vertex)) {
        return false;
    }
    this->graph[value].push_back(edge);

    this->addVertex(edge.vertex, false);
    if (this->hasEdge(edge.vertex, value)) {
        return false;
    }
    this->graph[edge.vertex].push_back(this->toEdge(value, edge.weight, edge.label));
    return true;
}

template <typename T>
// добавление ребра по вершине1 и вершине2
bool UndirectedGraph<T>::addEdge(const T& value, const T& edge) {
    Edge<T> e(edge);
    return this->addEdge(value, e);
}

template <typename T>
// добавление ребра по вершине1 и вершине2 + вес
bool UndirectedGraph<T>::addEdge(const T& value, const T& edge, int weight) {
    Edge<T> e(edge, weight);
    return this->addEdge(value, e);
}

template <typename T>
// добавление ребра по вершине1 и вершине2 + вес + метка
bool UndirectedGraph<T>::addEdge(const T& value, const T& edge, int weight, string label) {
    Edge<T> e(edge, weight, label);
    return this->addEdge(value, e);
}

template <typename T>
// удаление вершины
bool UndirectedGraph<T>::deleteVertex(const T& value) {
    if (!this->hasVertex(value)) {
        return false;
    }
    this->graph.erase(value);
    for (const auto& [vertex, edges] : this->graph) {
        typename vector<Edge<T>>::iterator it = this->findEdge(vertex, value);
        if (it != this->graph[vertex].end()) {
            this->graph[vertex].erase(it);
        }
    }
    return true;
}

template <typename T>
// удаление ребра
bool UndirectedGraph<T>::deleteEdge(const T& value, const T& edge) {
    typename vector<Edge<T>>::iterator it = this->findEdge(value, edge);
    if (it == this->graph[value].end()) {
        return false;
    }
    this->graph[value].erase(it);
    it = this->findEdge(edge, value);
    if (it != this->graph[edge].end()) {
        this->graph[edge].erase(it);
    }
    return true;
}

template <typename T>
// полустепень исхода
int UndirectedGraph<T>::getOutdegree(const T& vertex) {
    return -3;
}

template <typename T>
// полустепень захода
int UndirectedGraph<T>::getIndegree(const T& vertex) {
    return -3;
}

template <typename T>
// степень вершины
int UndirectedGraph<T>::getDegree(const T& vertex) {
    return this->graph[vertex].size();
}

template <typename T>
// обращение графа
string UndirectedGraph<T>::reverse() {
    return nullptr;
}

template <typename T>
std::string UndirectedGraph<T>::kruskal() {
    // --- 1. Собираем уникальные рёбра ---
    std::vector<FullEdge<T>> edges;
    std::set<std::pair<T, T>> seen;

    for (auto& [u, adj] : this->graph) {
        for (auto& e : adj) {
            auto key = std::minmax(u, e.vertex);
            if (seen.insert(key).second) {
                edges.push_back({u, e.vertex, e.weight});
            }
        }
    }

    // --- 2. Сортировка по весу ---
    std::sort(edges.begin(), edges.end(),
        [](const FullEdge<T>& a, const FullEdge<T>& b) {
            return a.weight < b.weight;
        });

    // --- 3. Union-Find ---
    std::map<T, T> parent;
    std::map<T, int> rank;

    for (auto& [u, _] : this->graph) {
        parent[u] = u;
        rank[u] = 0;
    }

    auto find = [&](const T& v, auto&& find_ref) -> T {
        if (parent[v] != v)
            parent[v] = find_ref(parent[v], find_ref);
        return parent[v];
    };

    auto unite = [&](const T& a, const T& b) {
        T pa = find(a, find);
        T pb = find(b, find);
        if (pa == pb) return;

        if (rank[pa] < rank[pb]) parent[pa] = pb;
        else if (rank[pa] > rank[pb]) parent[pb] = pa;
        else {
            parent[pb] = pa;
            rank[pa]++;
        }
    };

    // --- 4. MST ---
    std::vector<FullEdge<T>> mst;
    for (auto& e : edges) {
        if (find(e.u, find) != find(e.v, find)) {
            unite(e.u, e.v);
            mst.push_back(e);
        }
    }

    // --- 5. JSON ---
    std::stringstream ss;
    ss << "{";
    ss << "\"directed\":false,";

    // nodes
    ss << "\"nodes\":[";
    bool first = true;
    for (auto& [u, _] : this->graph) {
        if (!first) ss << ",";
        first = false;
        ss << "{\"id\":\"" << u << "\"}";
    }
    ss << "],";

    // edges
    ss << "\"edges\":[";
    for (size_t i = 0; i < mst.size(); ++i) {
        auto& e = mst[i];
        if (i > 0) ss << ",";
        ss << "{";
        ss << "\"source\":\"" << e.u << "\",";
        ss << "\"target\":\"" << e.v << "\",";
        ss << "\"weight\":" << e.weight << ",";
        ss << "\"label\":\"no label\"";
        ss << "}";
    }
    ss << "]";

    ss << "}";
    return ss.str();
}


template<typename T>
string UndirectedGraph<T>::maxFlow(T s, T t) {
    return "{\n  No such operation\n}";
}

template <typename T>
string UndirectedGraph<T>::toJSON() {
    return Graph<T>::toJSON(false);
}
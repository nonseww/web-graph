#include <iostream>
#include "Graph/DirectedGraph.h"
#include "Graph/UndirectedGraph.h"
#include "Graph/GraphUI.h"

using namespace std;

int main() {
    // привязка к существующему графу
    DirectedGraph<string> dirGraph("input1.txt");
    GraphUI<string> ui(dirGraph);
    //ui.run();

    // динамическое создание графа у GraphUI
    GraphUI<string> ui2("directed");
    ui2.run();
    
    return 0;
}
// import QtQuick 1.0 // to target S60 5th Edition or Maemo 5
import QtQuick 1.1
import QtWebKit 1.0
import "content"

Rectangle {
    id: window
    width: 960; height: 640

    property string currentFeed: "rss.news.yahoo.com/rss/topstories"
    property bool loading: feedModel.status == XmlListModel.Loading

    RssFeeds { id: rssFeeds }

    XmlListModel {
        id: feedModel
        source: "http://" + window.currentFeed
        query: "/rss/channel/item"

        XmlRole { name: "title"; query: "title/string()" }
        XmlRole { name: "link"; query: "link/string()" }
        XmlRole { name: "description"; query: "description/string()" }
    }

    Row {
        Rectangle {
            id: sourceList
            width: 220; height: window.height
            color: "#efefef"

            ListView {
                focus: true
                id: categories
                anchors.fill: parent
                model: rssFeeds
                footer: quitButtonDelegate
                delegate: CategoryDelegate {}
                highlight: Rectangle { color: "steelblue" }
                highlightMoveSpeed: 9999999
            }
            ScrollBar {
                scrollArea: categories; height: categories.height; width: 8
                anchors.right: categories.right
            }
        }
        Rectangle {
            id: articleList
            width: 220; height: window.height
            color: "#efefef"

            ListView {
                id: list
                width: 220; height: window.height
                model: feedModel
                delegate: NewsDelegate {}
            }
            ScrollBar {
                scrollArea: list; height: list.height; width: 8
                anchors.right: list.right
            }
        }

        ContentView {
            id: content
            //anchors.left: articleList.right
            url: "http://www.news.yahoo.com"
        }
    }
    Component {
        id: quitButtonDelegate
        Item {
            width: categories.width; height: 60
            Text {
                text: "Quit"
                font { family: "Helvetica"; pixelSize: 16; bold: true }
                anchors {
                    left: parent.left; leftMargin: 15
                    verticalCenter: parent.verticalCenter
                }
            }
            MouseArea {
                anchors.fill: parent
                onClicked: Qt.quit()
            }
        }
    }
    ScrollBar { scrollArea: content; height: content.height; width: 8; anchors.right: window.right }
    Rectangle { x: 220; height: window.height; width: 1; color: "#cccccc" }
}

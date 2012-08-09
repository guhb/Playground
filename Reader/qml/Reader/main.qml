// import QtQuick 1.0 // to target S60 5th Edition or Maemo 5
import QtQuick 1.1
import QtWebKit 1.0
import "content"

Rectangle {
    id: window
    width: 440 + content.width; height: 640

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
        id: listPanel
        //z: 10
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
        Rectangle {
            id: c
            width: 420 ; height: parent.height
            Text {
                //anchors.fill: parent
                width: 420
                id: content
                wrapMode: Text.WordWrap
            }
            ScrollBar {
                scrollArea: c; height: c.height; width: 8
                anchors.right: c.right
            }
        }
    }
    /*
    Rectangle {
        anchors.left: listPanel.right
        height: parent.height
        width: content.width
        ContentView {
            //anchors.left: listPanel.right
            id: content
            //anchors.left: articleList.right
            url: "http://www.qt-project.org"
        }
    }*/
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

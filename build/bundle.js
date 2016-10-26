(function (ReactDOM,reactRouter,React$1,reactBootstrap,redux,ramda,rxjs) {
'use strict';

var ReactDOM__default = 'default' in ReactDOM ? ReactDOM['default'] : ReactDOM;

function __extends(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var About = React$1.createClass({
    render: function () {
        return React$1.createElement("div", null, "About");
    }
});

var appConfig = {
    baseFolder: "/img",
    defaultExt: "jpg",
    projects: [
        {
            id: "personal",
            name: "Personal",
            folder: "personal",
            gallery: [
                { name: "Dragon" },
                { name: "Lust" },
                { name: "GestureDrawings" },
                { name: "HippieGrannies" }
            ]
        },
        {
            id: "bb2",
            folder: "bloodbrothers",
            name: "Blood Brothers",
            ext: "png",
            gallery: [
                { name: "Exant" },
                { name: "Kay" },
                { name: "MotherNature" },
                { name: "Oren" },
                { name: "ScrollPriestess" }
            ]
        },
        {
            id: "dal",
            folder: "dragonage",
            name: "Dragon Age",
            gallery: [
                { name: "Castleroom01" },
                { name: "Castleroom02" },
                { name: "ChristmasArmour" },
                { name: "MageGolems" }
            ]
        },
        {
            id: "ds",
            ext: "png",
            name: "DeckStorm",
            folder: "deckstorm",
            logo: '',
            gallery: [
                { name: "DesertKing" },
                { name: "HarraHun" },
                { name: "IbramFrodden" },
                { name: "PaidCurrency" },
                { name: "Skeleton" }
            ]
        },
        {
            id: "mmh",
            folder: "mightyheros",
            name: "Mighty Heros",
            ext: "png",
            gallery: [
                { name: "MarvelCharacterTurnTable" },
                { name: "MarvelIllustration01" },
                { name: "MarvelIllustration02" },
                { name: "MarvelIllustration03" },
                { name: "MarvelIllustration04" }
            ]
        },
        {
            id: "xmen",
            folder: "xmen",
            name: "X-Men",
            gallery: [
                { name: "AppStore" },
                { name: "Box" },
                { name: "Cerebro" },
                { name: "DiamondCave" },
                { name: "Hammer" },
                { name: "Lab" },
                { name: "MissionClear" },
                { name: "Storm" },
                { name: "XmenFbad" }
            ]
        }
    ]
};

function gallery(state, action) {
    if (state === void 0) { state = {}; }
    switch (action.type) {
        case "SELECT_IMAGE":
            return ramda.merge(state, { selected: action.id });
        default:
            return state;
    }
}
function projects(state, action) {
    if (state === void 0) { state = { projects: [], selected: null }; }
    switch (action.type) {
        case 'SELECT_PROJECT':
            var project = ramda.find(ramda.propEq('id', action.id))(state.projects);
            return ramda.merge(state, { selected: project });
        default:
            return state;
    }
}
var reducer = redux.combineReducers({
    gallery: gallery,
    projects: projects
});
var app = redux.createStore(reducer, {
    gallery: { selected: 0 },
    projects: { projects: appConfig.projects }
});
var app$ = rxjs.Observable.from(app)
    .map(function () { return app.getState(); })
    .publishBehavior(app.getState())
    .refCount();

// Set selected gallery item
var setSelected = function (id) { return ({ id: id, type: 'SELECT_IMAGE' }); };
var resetSelected = function () { return setSelected(0); };
// Set the selected project
var setProject = function (id) { return ({ id: id, type: 'SELECT_PROJECT' }); };

var FeaturedImage = function (_a) {
    var url = _a.url, onClick = _a.onClick;
    return React$1.createElement(reactBootstrap.Panel, null, 
        React$1.createElement(reactBootstrap.Image, {src: url, onClick: onClick, responsive: true, className: "home-image center-block"})
    );
};
var ProjectGallery = function (_a) {
    var urls = _a.urls, logo = _a.logo;
    return React$1.createElement(reactBootstrap.Panel, null, 
        React$1.createElement(reactBootstrap.Row, null, 
            React$1.createElement(reactBootstrap.Image, {src: logo, height: 100, width: 200, className: "center-block"})
        ), 
        React$1.createElement("br", null), 
        React$1.createElement(reactBootstrap.Row, null, urls.map(function (url, index) {
            return React$1.createElement(reactBootstrap.Col, {xs: 6, md: 4}, 
                React$1.createElement(reactBootstrap.Thumbnail, {href: "#", src: url, height: 100, width: 100, onClick: function () { return app.dispatch(setSelected(index)); }})
            );
        })));
};
var Gallery = React$1.createClass({
    getInitialState: function () {
        return { selected: 0, project: { gallery: [] }, showModal: false };
    },
    componentWillReceiveProps: function (_a) {
        var projectId = _a.params.projectId;
        if (this.props.params.projectId !== projectId) {
            app.dispatch(resetSelected());
            app.dispatch(setProject(projectId));
        }
    },
    componentDidMount: function () {
        var _this = this;
        app$.distinctUntilKeyChanged('projects')
            .pluck('projects')
            .filter(function (_a) {
            var selected = _a.selected;
            return !!selected;
        })
            .subscribe(function (_a) {
            var selected = _a.selected;
            var folder = selected.folder, gallery = selected.gallery;
            var ext = selected.ext || _this.props.route.defaultExt;
            _this.setState({ project: { folder: folder, gallery: gallery, ext: ext } });
        });
        app$.distinctUntilKeyChanged('gallery')
            .pluck('gallery')
            .subscribe(function (_a) {
            var selected = _a.selected;
            return _this.setState({ selected: selected });
        });
        // Initialize the first time we arrive here
        app.dispatch(setProject(this.props.params.projectId));
    },
    close: function () {
        this.setState({ showModal: false });
    },
    open: function () {
        this.setState({ showModal: true });
    },
    render: function () {
        var baseUrl = this.props.route.baseUrl;
        var _a = this.state.project, gallery = _a.gallery, folder = _a.folder, ext = _a.ext;
        var selected = this.state.selected;
        var thumbUrls = gallery.map(function (_a) {
            var name = _a.name;
            return (baseUrl + "/" + folder + "/thumb/" + name + "_Thumb.jpg");
        });
        var highlightUrl = !!folder && gallery.length > 0 && selected > -1 ?
            baseUrl + "/" + folder + "/" + gallery[selected].name + "." + ext :
            '';
        var logo = !!folder ?
            baseUrl + "/" + folder + "/logo.png" :
            '';
        return (React$1.createElement(reactBootstrap.Grid, null, 
            React$1.createElement(reactBootstrap.Col, {xs: 12, md: 4, mdOffset: 1}, 
                React$1.createElement(ProjectGallery, {urls: thumbUrls, logo: logo})
            ), 
            React$1.createElement(reactBootstrap.Col, {xs: 12, md: 6, mdOffset: 1}, 
                React$1.createElement(FeaturedImage, {url: highlightUrl, onClick: this.open})
            ), 
            React$1.createElement(reactBootstrap.Modal, {show: this.state.showModal, onHide: this.close}, 
                React$1.createElement(reactBootstrap.Modal.Body, null, 
                    React$1.createElement(reactBootstrap.Carousel, null, 
                        React$1.createElement(reactBootstrap.Carousel.Item, null, 
                            React$1.createElement("img", {width: 900, height: 500, alt: "900x500", src: "/img/personal/dragon.jpg"}), 
                            React$1.createElement(reactBootstrap.Carousel.Caption, null, 
                                React$1.createElement("h3", null, "First slide label"), 
                                React$1.createElement("p", null, "Nulla vitae elit libero, a pharetra augue mollis interdum."))), 
                        React$1.createElement(reactBootstrap.Carousel.Item, null, 
                            React$1.createElement("img", {width: 900, height: 500, alt: "900x500", src: "/img/deckstorm/DesertKing.png"}), 
                            React$1.createElement(reactBootstrap.Carousel.Caption, null, 
                                React$1.createElement("h3", null, "Second slide label"), 
                                React$1.createElement("p", null, "Nulla vitae elit libero, a pharetra augue mollis interdum."))))
                )
            )));
    }
});

var Contact = function (_a) {
    var route = _a.route;
    return (React.createElement("div", null, 
        React.createElement("div", {className: "contactForm"}, 
            React.createElement(reactBootstrap.Form, {horizontal: true}, 
                React.createElement(reactBootstrap.FormGroup, null, 
                    React.createElement(reactBootstrap.Col, {sm: 6}, 
                        React.createElement(reactBootstrap.FormControl, {type: "text", required: true, placeholder: "Name"})
                    ), 
                    React.createElement(reactBootstrap.Col, {sm: 6}, 
                        React.createElement(reactBootstrap.FormControl, {type: "email", required: true, placeholder: "Email"})
                    )), 
                React.createElement(reactBootstrap.FormGroup, null, 
                    React.createElement(reactBootstrap.Col, {xs: 12}, 
                        React.createElement(reactBootstrap.FormControl, {componentClass: "textarea", placeholder: "Message", rows: 8, required: true})
                    )
                ), 
                React.createElement(reactBootstrap.FormGroup, null, 
                    React.createElement(reactBootstrap.Col, {xs: 2}, 
                        React.createElement(reactBootstrap.Button, {bsStyle: "info"}, "Submit")
                    )
                ))
        ), 
        React.createElement("div", {className: "contactDetails"}, 
            React.createElement("div", {id: "address", className: "block"}, 
                React.createElement("h4", null, "Address"), 
                React.createElement("p", null, route.info.address)), 
            React.createElement("div", {id: "phoneNumber", className: "block"}, 
                React.createElement("h4", null, "Phone Number"), 
                React.createElement("p", null, route.info.phoneNumber)), 
            React.createElement("div", {id: "emailAddress", className: "block"}, 
                React.createElement("h4", null, "Email Address"), 
                React.createElement("p", null, route.info.emailAddress)))));
};

var Home = React$1.createClass({
    render: function () {
        return (React$1.createElement(reactBootstrap.Col, {md: 4, mdOffset: 4, className: "g-item"}, 
            React$1.createElement(reactBootstrap.Image, {src: "/img/personal/dragon.jpg", responsive: true, className: "home-image center-block"})
        ));
    }
});

var CustomToggle = (function (_super) {
    __extends(CustomToggle, _super);
    function CustomToggle(props, context) {
        _super.call(this, props, context);
        this.handleClick = this.handleClick.bind(this);
    }
    CustomToggle.prototype.handleClick = function (e) {
        e.preventDefault();
        this.props.onClick(e);
    };
    CustomToggle.prototype.render = function () {
        return (React$1.createElement("a", {href: "", onClick: this.handleClick}, this.props.children));
    };
    return CustomToggle;
}(React$1.Component));
var CustomMenu = (function (_super) {
    __extends(CustomMenu, _super);
    function CustomMenu(props, context) {
        var _this = this;
        _super.call(this, props, context);
        this.onChange = function (e) { return _this.setState({ value: e.target.value }); };
        this.onBlur = function () { return _this.setState({ value: '' }); };
        this.state = { value: '' };
    }
    CustomMenu.prototype.focusNext = function () {
        var input = ReactDOM__default.findDOMNode(this.input);
        if (input) {
            input.focus();
        }
    };
    CustomMenu.prototype.render = function () {
        var children = this.props.children;
        var value = this.state.value;
        return (React$1.createElement("div", {className: "dropdown-menu"}, 
            React$1.createElement("ul", null, React$1.Children.toArray(children))
        ));
    };
    return CustomMenu;
}(React$1.Component));

var App = React$1.createClass({
    render: function () {
        var projects = this.props.route.config.projects;
        return (React$1.createElement(reactBootstrap.Grid, {className: "form-group"}, 
            React$1.createElement(reactBootstrap.Row, null, 
                React$1.createElement(reactBootstrap.Col, {mdOffset: 4, md: 4}, 
                    React$1.createElement("h1", {className: "text-center"}, 
                        React$1.createElement(reactRouter.Link, {to: "/", className: "my-name"}, "Dionne Phua")
                    )
                )
            ), 
            React$1.createElement(reactBootstrap.Row, null, 
                React$1.createElement("div", {className: "sexy_line"})
            ), 
            React$1.createElement(reactBootstrap.Row, null, 
                React$1.createElement(reactBootstrap.Col, {className: "text-center", xsOffset: 2, xs: 2}, 
                    React$1.createElement(reactRouter.Link, {to: "/about", className: "menu-item-default"}, "About")
                ), 
                React$1.createElement(reactBootstrap.Col, {className: "text-center", xsOffset: 1, xs: 2}, 
                    React$1.createElement(reactBootstrap.Dropdown, null, 
                        React$1.createElement(CustomToggle, {bsRole: "toggle"}, 
                            React$1.createElement(reactRouter.Link, {className: "menu-item-default"}, "Gallery")
                        ), 
                        React$1.createElement(CustomMenu, {bsRole: "menu"}, projects.map(function (project, index) {
                            return (React$1.createElement(reactBootstrap.MenuItem, {eventKey: index}, 
                                React$1.createElement(reactRouter.Link, {to: "/gallery/" + project.id}, project.name)
                            ));
                        })))
                ), 
                React$1.createElement(reactBootstrap.Col, {className: "text-center", xsOffset: 1, xs: 2}, 
                    React$1.createElement(reactRouter.Link, {to: "/contact", className: "menu-item-default"}, "Contact")
                )), 
            React$1.createElement("br", null), 
            React$1.createElement(reactBootstrap.Row, null, this.props.children), 
            React$1.createElement("footer", {className: "footer"}, 
                React$1.createElement(reactBootstrap.Grid, null, 
                    React$1.createElement("p", {className: "text-muted"}, "© Copyright Dionne Phua 2016")
                )
            )));
    }
});

var NoMatch = React$1.createClass({
    render: function () {
        return React$1.createElement("div", null, "No Match");
    }
});
var contactInfo = {
    emailAddress: 'dphua@ringling.edu',
    address: 'San Francisco, CA',
    phoneNumber: 'XXX-XXX-XXXX'
};
ReactDOM.render(React$1.createElement(reactRouter.Router, {history: reactRouter.hashHistory}, 
    React$1.createElement(reactRouter.Route, {path: "/", config: appConfig, component: App}, 
        React$1.createElement(reactRouter.IndexRoute, {component: Home}), 
        React$1.createElement(reactRouter.Route, {path: "about", component: About}), 
        React$1.createElement(reactRouter.Route, {path: "gallery/:projectId", baseUrl: appConfig.baseFolder, defaultExt: appConfig.defaultExt, component: Gallery}), 
        React$1.createElement(reactRouter.Route, {path: "contact", info: contactInfo, component: Contact}), 
        React$1.createElement(reactRouter.Route, {path: "*", component: NoMatch}))
), document.getElementById('content'));

}(ReactDOM,ReactRouter,React,ReactBootstrap,Redux,R,Rx));

//# sourceMappingURL=bundle.js.map

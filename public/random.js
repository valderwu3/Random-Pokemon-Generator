var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function () { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var HISTORY_SIZE = 64;
var STORAGE_SHINIES_KEY = "shinies";
var latestPokemon = [];
var displayedIndex = -1;
function addToHistory(pokemon) {
    if (!pokemon || pokemon.length == 0) {
        return;
    }
    latestPokemon.unshift(pokemon);
    while (latestPokemon.length > HISTORY_SIZE) {
        latestPokemon.pop();
    }
    var shinies = getShinies();
    shinies.unshift.apply(shinies, pokemon.filter(function (p) { return p.shiny; }));
    window.localStorage.setItem(STORAGE_SHINIES_KEY, JSON.stringify(shinies));
    displayedIndex = 0;
    toggleHistoryVisibility(shinies);
}
function toggleHistoryVisibility(shinies) {
    document.getElementById("previous").classList.toggle("hidden", displayedIndex >= latestPokemon.length - 1);
    document.getElementById("next").classList.toggle("hidden", displayedIndex <= 0);
    shinies = shinies !== null && shinies !== void 0 ? shinies : getShinies();
    document.getElementById("shiny-count").innerHTML = String(shinies.length);
    document.getElementById("shinies").innerHTML = "<ol>"
        + shinies.map(function (p) { return p.toHtmlForShinyHistory(); }).join(" ")
        + "</ol>";
    document.getElementById("shiny-toggler").classList.toggle("invisible", shinies.length == 0);
}
function displayPrevious() {
    displayHistoryAtIndex(displayedIndex + 1);
}
function displayNext() {
    displayHistoryAtIndex(displayedIndex - 1);
}
function displayHistoryAtIndex(index) {
    index = Math.max(0, Math.min(index, latestPokemon.length - 1));
    displayedIndex = index;
    displayPokemon(latestPokemon[index]);
    toggleHistoryVisibility();
}
function getShinies() {
    var shinies = JSON.parse(window.localStorage.getItem(STORAGE_SHINIES_KEY), dateReviver);
    if (!Array.isArray(shinies)) {
        return [];
    }
    return shinies.map(function (shiny) { return GeneratedPokemon.fromJson(shiny); });
}
function dateReviver(key, value) {
    if (key == "date" && typeof value == "string") {
        return new Date(value);
    }
    else {
        return value;
    }
}
function toggleShinyDisplay() {
    var isInvisible = document.getElementById("shiny-container").classList.toggle("invisible");
    updateShinyToggler(!isInvisible);
}
function updateShinyToggler(shiniesVisible) {
    var button = document.getElementById("shiny-toggler");
    button.classList.toggle("is-hiding", !shiniesVisible);
    button.classList.toggle("is-showing", shiniesVisible);
}
function clearShinies() {
    if (window.confirm("Are you sure you want to clear your shiny Pokémon?")) {
        window.localStorage.removeItem(STORAGE_SHINIES_KEY);
        document.getElementById("shiny-container").classList.add("invisible");
        toggleHistoryVisibility([]);
        updateShinyToggler(false);
    }
}
var STORAGE_OPTIONS_KEY = "options";
var numberDropdown = document.getElementById("n");
var regionsDropdown = document.getElementById("regions");
var allRegionsCheckbox = regionsDropdown.querySelector("input[value='all']");
var regionCheckboxes = Array.from(regionsDropdown.querySelectorAll("input:not([value='all'])"));
var typesDropdown = document.getElementById("types");
var allTypesCheckbox = typesDropdown.querySelector("input[value='all']");
var typeCheckboxes = Array.from(typesDropdown.querySelectorAll("input:not([value='all'])"));
var sublegendariesCheckbox = document.getElementById("sublegendaries");
var legendariesCheckbox = document.getElementById("legendaries");
var mythicalsCheckbox = document.getElementById("mythicals");
var paradoxCheckbox = document.getElementById("paradox");
var ultraBeastCheckbox = document.getElementById("ultraBeast");
var nfesCheckbox = document.getElementById("nfes");
var fullyEvolvedCheckbox = document.getElementById("fullyEvolved");
var unevolvedCheckbox = document.getElementById("unevolved");
var evolvedOnceCheckbox = document.getElementById("evolvedOnce");
var evolvedTwiceCheckbox = document.getElementById("evolvedTwice");
var evolutionCountCheckboxes = [unevolvedCheckbox, evolvedOnceCheckbox, evolvedTwiceCheckbox];
var spritesCheckbox = document.getElementById("sprites");
var naturesCheckbox = document.getElementById("natures");
var gendersCheckbox = document.getElementById("genders");
var formsDropdown = document.getElementById("formsDropdown");
var formsCheckbox = document.getElementById("forms");
var megasCheckbox = document.getElementById("megas");
var gigantamaxesCheckbox = document.getElementById("gigantamaxes");
function getOptionsFromForm() {
    return {
        n: parseInt(numberDropdown.value),
        regions: getSelectedRegions(),
        types: getSelectedTypes(),
        sublegendaries: sublegendariesCheckbox.checked,
        legendaries: legendariesCheckbox.checked,
        mythicals: mythicalsCheckbox.checked,
        paradoxes: paradoxCheckbox.checked,
        ultraBeasts: ultraBeastCheckbox.checked,
        evolutionCounts: getEvolutionCounts(),
        nfes: nfesCheckbox.checked,
        fullyEvolved: fullyEvolvedCheckbox.checked,
        sprites: spritesCheckbox.checked,
        natures: naturesCheckbox.checked,
        genders: gendersCheckbox.checked,
        forms: formsCheckbox.checked,
        megas: megasCheckbox.checked,
        gigantamaxes: gigantamaxesCheckbox.checked
    };
}
function getEvolutionCounts() {
    return evolutionCountCheckboxes
        .filter(function (checkbox) { return checkbox.checked; })
        .map(function (checkbox) { return parseInt(checkbox.value); });
}
function getSelectedRegions() {
    return regionCheckboxes
        .filter(function (checkbox) { return checkbox.checked; })
        .map(function (checkbox) { return checkbox.value; });
}
function getSelectedTypes() {
    return typeCheckboxes
        .filter(function (checkbox) { return checkbox.checked; })
        .map(function (checkbox) { return checkbox.value; });
}
function setOptions(options) {
    if (options.n != null) {
        setDropdownIfValid(numberDropdown, options.n);
    }
    if (options.regions != null) {
        var regions_1 = new Set(options.regions);
        regionCheckboxes.forEach(function (checkbox) {
            checkbox.checked = regions_1.has(checkbox.value) || options.regions.length == 0;
        });
    }
    if (options.types != null) {
        var types_1 = new Set(options.types);
        typeCheckboxes.forEach(function (checkbox) {
            checkbox.checked = types_1.has(checkbox.value) || options.types.length == 0;
        });
    }
    if (options.sublegendaries != null) {
        sublegendariesCheckbox.checked = options.sublegendaries;
    }
    if (options.legendaries != null) {
        legendariesCheckbox.checked = options.legendaries;
    }
    if (options.mythicals != null) {
        mythicalsCheckbox.checked = options.mythicals;
    }
    if (options.paradoxes != null) {
        paradoxCheckbox.checked = options.paradoxes;
    }
    if (options.ultraBeasts != null) {
        ultraBeastCheckbox.checked = options.ultraBeasts;
    }
    if (options.evolutionCounts != null) {
        var counts_1 = new Set(options.evolutionCounts);
        evolutionCountCheckboxes.forEach(function (checkbox) {
            checkbox.checked = counts_1.has(parseInt(checkbox.value)) || options.evolutionCounts.length == 0;
        });
    }
    if (options.nfes != null) {
        nfesCheckbox.checked = options.nfes;
    }
    if (options.fullyEvolved != null) {
        fullyEvolvedCheckbox.checked = options.fullyEvolved;
    }
    if (options.sprites != null) {
        spritesCheckbox.checked = options.sprites;
    }
    if (options.natures != null) {
        naturesCheckbox.checked = options.natures;
    }
    if (options.genders != null) {
        gendersCheckbox.checked = options.genders;
    }
    if (options.forms != null) {
        formsCheckbox.checked = options.forms;
    }
    if (options.megas != null) {
        megasCheckbox.checked = options.megas;
    }
    if (options.gigantamaxes != null) {
        gigantamaxesCheckbox.checked = options.gigantamaxes;
    }
    if (options.generate !== undefined) {
        generateRandom();
    }
}
function persistOptions(options) {
    var optionsJson = JSON.stringify(options);
    window.localStorage.setItem(STORAGE_OPTIONS_KEY, optionsJson);
    window.history.replaceState({}, "", "?" + convertOptionsToUrlParams(options));
}
function loadOptions() {
    if (urlHasOptions()) {
        setOptions(convertUrlParamsToOptions());
    }
    else {
        var optionsJson = window.localStorage.getItem(STORAGE_OPTIONS_KEY);
        if (optionsJson) {
            setOptions(JSON.parse(optionsJson));
        }
    }
}
function urlHasOptions() {
    var queryString = window.location.href.split("?")[1];
    return queryString && queryString.length > 0;
}
function convertUrlParamsToOptions() {
    var options = {};
    var params = new URL(window.location.href).searchParams;
    if (params.has("n")) {
        options.n = parseInt(params.get("n"));
    }
    if (params.has("region")) {
        var region = params.get("region");
        options.regions = region == "all" ? [] : [region];
    }
    if (params.has("regions")) {
        var regions = params.get("regions").split(",");
        options.regions = regions[0] == "all" ? [] : regions;
    }
    if (params.has("type")) {
        var type = params.get("type");
        options.types = type == "all" ? [] : [type];
    }
    if (params.has("types")) {
        var types = params.get("types").split(",");
        options.types = types[0] == "all" ? [] : types;
    }
    if (params.has("sublegendaries")) {
        options.sublegendaries = parseBoolean(params.get("sublegendaries"));
    }
    if (params.has("legendaries")) {
        options.legendaries = parseBoolean(params.get("legendaries"));
    }
    if (params.has("mythicals")) {
        options.mythicals = parseBoolean(params.get("mythicals"));
    }
    if (params.has("paradoxes")) {
        options.paradoxes = parseBoolean(params.get("paradoxes"));
    }
    if (params.has("ultraBeasts")) {
        options.ultraBeasts = parseBoolean(params.get("ultraBeasts"));
    }
    if (params.has("evolutionCounts")) {
        options.evolutionCounts = params.get("evolutionCounts")
            .split(",")
            .map(function (c) { return parseInt(c); });
    }
    if (params.has("nfes")) {
        options.nfes = parseBoolean(params.get("nfes"));
    }
    if (params.has("fullyEvolved")) {
        options.fullyEvolved = parseBoolean(params.get("fullyEvolved"));
    }
    if (params.has("sprites")) {
        options.sprites = parseBoolean(params.get("sprites"));
    }
    if (params.has("natures")) {
        options.natures = parseBoolean(params.get("natures"));
    }
    if (params.has("genders")) {
        options.genders = parseBoolean(params.get("genders"));
    }
    if (params.has("forms")) {
        options.forms = parseBoolean(params.get("forms"));
    }
    if (params.has("megas")) {
        options.megas = parseBoolean(params.get("megas"));
    }
    if (params.has("gigantamaxes")) {
        options.gigantamaxes = parseBoolean(params.get("gigantamaxes"));
    }
    if (params.has("generate")) {
        options.generate = true;
    }
    return options;
}
function convertOptionsToUrlParams(options) {
    return Object.entries(options)
        .map(function (_a) {
            var key = _a[0], value = _a[1];
            var encodableValue;
            if (Array.isArray(value)) {
                if (value.length == 0
                    || (key == "types" && value.length == typeCheckboxes.length)
                    || (key == "regions" && value.length == regionCheckboxes.length)) {
                    encodableValue = "all";
                }
                else {
                    encodableValue = value.join(",");
                }
            }
            else {
                encodableValue = value;
            }
            return encodeURIComponent(key) + "=" + encodeURIComponent(encodableValue);
        })
        .join("&");
}
function addFormChangeListeners() {
    toggleDropdownsOnButtonClick();
    formsCheckbox.addEventListener("change", toggleFormSubtypes);
    toggleFormSubtypes();
    document.querySelectorAll("input[type='checkbox'][data-select-all='true']").forEach(function (checkbox) {
        checkbox.addEventListener("change", selectAll);
    });
    document.querySelectorAll(".dropdown").forEach(function (dropdown) {
        updateDropdownTitle(dropdown);
        dropdown.querySelectorAll("input[type='checkbox']").forEach(function (checkbox) {
            checkbox.addEventListener("change", function () { return updateDropdownTitle(dropdown); });
        });
    });
}
function toggleFormSubtypes() {
    megasCheckbox.disabled = !formsCheckbox.checked;
    gigantamaxesCheckbox.disabled = !formsCheckbox.checked;
}
function toggleDropdownsOnButtonClick() {
    document.querySelectorAll(".dropdown").forEach(function (dropdownWrapper) {
        var button = dropdownWrapper.querySelector("button");
        var popup = dropdownWrapper.querySelector(".popup");
        if (popup) {
            button.addEventListener("click", function (e) {
                popup.classList.toggle("visible");
            });
            document.addEventListener("keydown", function (event) {
                if (event.keyCode == 27) {
                    popup.classList.remove("visible");
                }
            });
            document.addEventListener("click", function (event) {
                if (event.target instanceof HTMLElement && event.target != button
                    && !popup.contains(event === null || event === void 0 ? void 0 : event.target)) {
                    popup.classList.remove("visible");
                }
            });
        }
    });
}
function selectAll(event) {
    if (!(event.target instanceof HTMLInputElement)) {
        return;
    }
    var selectAll = event.target.checked;
    var container = event.target.closest(".popup");
    container.querySelectorAll("input[type='checkbox']:not([data-select-all]")
        .forEach(function (checkbox) { return checkbox.checked = selectAll; });
}
function updateDropdownTitle(dropdownContainer) {
    var _a, _b;
    var button = dropdownContainer.querySelector("button");
    var selectAllCheckbox = dropdownContainer.querySelector("input[type='checkbox'][data-select-all='true']");
    var allCheckboxes = Array.from(dropdownContainer.querySelectorAll("input[type='checkbox']:not([data-select-all]"));
    var selectedCheckboxes = allCheckboxes.filter(function (checkbox) { return checkbox.checked && !checkbox.disabled; });
    var allAreSelected = selectedCheckboxes.length == allCheckboxes.length;
    var allowNoSelection = !!button.dataset.allowNone;
    var pluralName = button.dataset.pluralName;
    if (selectAllCheckbox) {
        selectAllCheckbox.checked = selectedCheckboxes.length > 0;
        selectAllCheckbox.indeterminate = !allAreSelected && selectAllCheckbox.checked;
    }
    var displayText;
    if (allowNoSelection && selectedCheckboxes.length == 0) {
        displayText = "No " + pluralName;
    }
    else if (allAreSelected || selectedCheckboxes.length == 0) {
        displayText = (_a = button.dataset.allName) !== null && _a !== void 0 ? _a : ("All " + pluralName);
    }
    else if (selectedCheckboxes.length == 1) {
        displayText = getNameForCheckbox(selectedCheckboxes[0]);
    }
    else if (button.dataset.allowShowingTwo && selectedCheckboxes.length == 2) {
        displayText = getNameForCheckbox(selectedCheckboxes[0]) + ", " + getNameForCheckbox(selectedCheckboxes[1]);
    }
    else {
        var nameForCount = (_b = button.dataset.nameForCount) !== null && _b !== void 0 ? _b : pluralName;
        displayText = selectedCheckboxes.length + " " + nameForCount;
    }
    button.innerText = displayText;
}
function getNameForCheckbox(checkbox) {
    if (checkbox.dataset.shortName) {
        return checkbox.dataset.shortName;
    }
    else {
        return checkbox.parentElement.innerText;
    }
}
var PATH_TO_SPRITES = 'sprites/normal/';
var PATH_TO_SHINY_SPRITES = 'sprites/shiny/';
var SPRITE_EXTENTION = '.webp';
var GeneratedPokemon = (function () {
    function GeneratedPokemon(pokemon, form, options) {
        var _a, _b, _c;
        if (!pokemon) {
            return;
        }
        this.id = pokemon.id;
        this.baseName = pokemon.name;
        this.name = (_a = form === null || form === void 0 ? void 0 : form.name) !== null && _a !== void 0 ? _a : pokemon.name;
        this.spriteSuffix = form === null || form === void 0 ? void 0 : form.spriteSuffix;
        if (options.natures) {
            this.nature = generateNature();
        }
        this.shiny = Math.floor(Math.random() * 65536) < 16;
        this.date = new Date();
        if (options.genders) {
            var ratio = (_c = (_b = form === null || form === void 0 ? void 0 : form.genderRatio) !== null && _b !== void 0 ? _b : pokemon === null || pokemon === void 0 ? void 0 : pokemon.genderRatio) !== null && _c !== void 0 ? _c : { male: 1, female: 1 };
            if (ratio != "unknown") {
                this.gender = Math.random() < (ratio.male / (ratio.male + ratio.female)) ? "male" : "female";
            }
        }
    }
    GeneratedPokemon.generate = function (pokemon, form, options) {
        return new GeneratedPokemon(pokemon, form, options);
    };
    GeneratedPokemon.fromJson = function (parsed) {
        var pokemon = new GeneratedPokemon();
        Object.assign(pokemon, parsed);
        return pokemon;
    };
    GeneratedPokemon.prototype.toHtml = function (includeSprite) {
        var classes = "";
        if (this.shiny) {
            classes += "shiny ";
        }
        if (!includeSprite) {
            classes += "imageless ";
        }
        return "<li class=\"".concat(classes, "\">\n\t\t\t").concat(includeSprite ? this.toImage() : "", "\n\t\t\t").concat(this.toText(), "\n\t\t</li>");
    };
    GeneratedPokemon.prototype.toHtmlForShinyHistory = function () {
        var encounterDate = this.date ?
            "<div class=\"date\" title=\"".concat(this.date, "\">Encountered on ").concat(this.date.toLocaleDateString(), "</div>")
            : "";
        return "<li>\n\t\t\t".concat(this.toImage(), "\n\t\t\t").concat(this.toText(), "\n\t\t\t").concat(encounterDate, "\n\t\t</li>");
    };
    GeneratedPokemon.prototype.toText = function () {
        return "\n\t\t\t".concat(this.nature ? "<span class=\"nature\">".concat(this.nature, "</span>") : "", "\n\t\t\t").concat(this.name, "\n\t\t\t").concat(this.genderToText(), "\n\t\t\t").concat(this.shiny ? "<span class=\"star\">&starf;</span>" : "", "\n\t\t");
    };
    GeneratedPokemon.prototype.genderToText = function () {
        if (this.name == "Nidoran ♀" || this.name == "Nidoran ♂") {
            return "";
        }
        else if (this.gender == "male") {
            return "<span class=\"male\" title=\"Male\">\u2642</span>";
        }
        else if (this.gender == "female") {
            return "<span class=\"female\" title=\"Female\">\u2640</span>";
        }
        else {
            return "";
        }
    };
    GeneratedPokemon.prototype.toImage = function () {
        var altText = (this.shiny ? "Shiny " : "") + this.name;
        return "<img src=\"".concat(this.getSpritePath(), "\" alt=\"").concat(altText, "\" title=\"").concat(altText, "\" />");
    };
    GeneratedPokemon.prototype.getSpritePath = function () {
        var path = this.shiny ? PATH_TO_SHINY_SPRITES : PATH_TO_SPRITES;
        var name = this.normalizeName();
        if (this.spriteSuffix) {
            name += "-" + this.spriteSuffix;
        }
        return path + name + SPRITE_EXTENTION;
    };
    GeneratedPokemon.prototype.normalizeName = function () {
        var _a;
        return ((_a = this.baseName) !== null && _a !== void 0 ? _a : this.name)
            .toLowerCase()
            .replaceAll("é", "e")
            .replaceAll("♀", "f")
            .replaceAll("♂", "m")
            .replaceAll(/['.:% -]/g, "");
    };
    return GeneratedPokemon;
}());
function mergePokemon(primary, secondary) {
    var _a, _b;
    if (!secondary || (!primary.forms && !secondary.forms)) {
        return primary;
    }
    var merged = JSON.parse(JSON.stringify(primary));
    merged.forms = mergeForms((_a = primary === null || primary === void 0 ? void 0 : primary.forms) !== null && _a !== void 0 ? _a : [primary], (_b = secondary.forms) !== null && _b !== void 0 ? _b : [secondary]);
    return merged;
}
function mergeForms(primaries, secondaries) {
    var formsBySpriteSuffix = new Map();
    for (var _i = 0, _a = [secondaries, primaries]; _i < _a.length; _i++) {
        var forms = _a[_i];
        for (var _b = 0, forms_1 = forms; _b < forms_1.length; _b++) {
            var form = forms_1[_b];
            formsBySpriteSuffix.set(form.spriteSuffix, form);
        }
    }
    return Array.from(formsBySpriteSuffix.values());
}
function generateNature() {
    return getRandomElement(NATURES);
}
var NATURES = ["Adamant", "Bashful", "Bold", "Brave", "Calm", "Careful", "Docile", "Gentle", "Hardy", "Hasty", "Impish", "Jolly", "Lax", "Lonely", "Mild", "Modest", "Na&iuml;ve", "Naughty", "Quiet", "Quirky", "Rash", "Relaxed", "Sassy", "Serious", "Timid"];
function generateRandom() {
    return __awaiter(this, void 0, void 0, function () {
        var options, eligiblePokemon, generatedPokemon, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    markLoading(true);
                    options = getOptionsFromForm();
                    persistOptions(options);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4, getEligiblePokemon(options)];
                case 2:
                    eligiblePokemon = _a.sent();
                    generatedPokemon = chooseRandom(eligiblePokemon, options);
                    addToHistory(generatedPokemon);
                    displayPokemon(generatedPokemon);
                    return [3, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error(error_1);
                    displayPokemon(null);
                    return [3, 4];
                case 4:
                    markLoading(false);
                    return [2];
            }
        });
    });
}
function onPageLoad() {
    loadOptions();
    toggleHistoryVisibility();
    addFormChangeListeners();
    displayYearsInFooter();
    document.getElementById('feedback-form').addEventListener('submit', submitFeedback);
    displayFeedback();
}
document.addEventListener("DOMContentLoaded", onPageLoad);
function displayPokemon(pokemon) {
    var resultsContainer = document.getElementById("results");
    if (!pokemon) {
        resultsContainer.innerHTML = "An error occurred while generating Pok&eacute;mon.";
    }
    else if (pokemon.length == 0) {
        resultsContainer.innerHTML = "No matching Pok&eacute;mon found.";
    }
    else {
        resultsContainer.innerHTML = toHtml(pokemon);
    }
}
var cachedOptionsJson;
var cachedEligiblePokemon;
function getEligiblePokemon(options) {
    return __awaiter(this, void 0, void 0, function () {
        var optionsJson, eligiblePokemon, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    optionsJson = JSON.stringify(options);
                    if (!(cachedOptionsJson == optionsJson)) return [3, 1];
                    return [2, Promise.resolve(cachedEligiblePokemon)];
                case 1:
                    _a = filterByOptions;
                    return [4, getPokemonInRegions(options.regions)];
                case 2:
                    eligiblePokemon = _a.apply(void 0, [_b.sent(), options]);
                    cachedOptionsJson = optionsJson;
                    cachedEligiblePokemon = eligiblePokemon;
                    return [2, eligiblePokemon];
            }
        });
    });
}
function getPokemonInRegions(regions) {
    return __awaiter(this, void 0, void 0, function () {
        var responses, pokemonById, _i, responses_1, response, pokemonInRegion, _a, pokemonInRegion_1, pokemon;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (regions.length == regionCheckboxes.length || regions.length == 0) {
                        regions = ["all"];
                    }
                    return [4, Promise.all(regions.map(function (region) { return fetch("dex/" + region + ".json"); }))];
                case 1:
                    responses = _b.sent();
                    pokemonById = new Map();
                    _i = 0, responses_1 = responses;
                    _b.label = 2;
                case 2:
                    if (!(_i < responses_1.length)) return [3, 5];
                    response = responses_1[_i];
                    if (!response.ok) {
                        console.error(response);
                        throw Error("Failed to get eligible Pokémon.");
                    }
                    return [4, response.json()];
                case 3:
                    pokemonInRegion = _b.sent();
                    if (responses.length == 1) {
                        return [2, pokemonInRegion];
                    }
                    for (_a = 0, pokemonInRegion_1 = pokemonInRegion; _a < pokemonInRegion_1.length; _a++) {
                        pokemon = pokemonInRegion_1[_a];
                        pokemonById.set(pokemon.id, mergePokemon(pokemon, pokemonById.get(pokemon.id)));
                    }
                    _b.label = 4;
                case 4:
                    _i++;
                    return [3, 2];
                case 5: return [2, Array.from(pokemonById.values())];
            }
        });
    });
}
function filterByOptions(pokemonInRegions, options) {
    var evolutionCounts = new Set(options.evolutionCounts);
    var types = new Set(options.types);
    return pokemonInRegions.filter(function (pokemon) {
        if (!options.sublegendaries && "isSubLegendary" in pokemon && pokemon.isSubLegendary) {
            return false;
        }
        if (!options.legendaries && "isLegendary" in pokemon && pokemon.isLegendary) {
            return false;
        }
        if (!options.mythicals && "isMythical" in pokemon && pokemon.isMythical) {
            return false;
        }
        if (!options.paradoxes && "isParadox" in pokemon && pokemon.isParadox) {
            return false;
        }
        if (!options.ultraBeasts && "isUltraBeast" in pokemon && pokemon.isUltraBeast) {
            return false;
        }
        if (options.nfes || options.fullyEvolved) {
            if (!options.nfes && "isNfe" in pokemon && pokemon.isNfe) {
                return false;
            }
            if (!options.fullyEvolved && !("isNfe" in pokemon)) {
                return false;
            }
        }
        if (evolutionCounts.size > 0) {
            var evolutionCount = "evolutionCount" in pokemon ? pokemon.evolutionCount : 0;
            if (!evolutionCounts.has(evolutionCount)) {
                return false;
            }
        }
        if (!options.megas && "isMega" in pokemon && pokemon.isMega) {
            return false;
        }
        if (!options.gigantamaxes && "isGigantamax" in pokemon && pokemon.isGigantamax) {
            return false;
        }
        if (options.forms && "forms" in pokemon) {
            pokemon.forms = filterByOptions(pokemon.forms, options);
            return pokemon.forms.length > 0;
        }
        if (types.size > 0 && !pokemon.types.some(function (type) { return types.has(type); })) {
            return false;
        }
        return true;
    });
}
function chooseRandom(eligiblePokemon, options) {
    var generated = [];
    eligiblePokemon = JSON.parse(JSON.stringify(eligiblePokemon));
    while (eligiblePokemon.length > 0 && generated.length < options.n) {
        var pokemon = removeRandomElement(eligiblePokemon);
        var form = null;
        if (options.forms && pokemon.forms) {
            form = removeRandomElement(pokemon.forms);
            if (form.isMega) {
                eligiblePokemon = removeMegas(eligiblePokemon);
            }
            if (form.isGigantamax) {
                eligiblePokemon = removeGigantamaxes(eligiblePokemon);
            }
        }
        generated.push(GeneratedPokemon.generate(pokemon, form, options));
    }
    return shuffle(generated);
}
function removeMegas(pokemonArray) {
    return pokemonArray.filter(function (pokemon) {
        if (pokemon.forms) {
            pokemon.forms = pokemon.forms.filter(function (form) { return !form.isMega; });
            return pokemon.forms.length > 0;
        }
        else {
            return true;
        }
    });
}
function removeGigantamaxes(pokemonArray) {
    return pokemonArray.filter(function (pokemon) {
        if (pokemon.forms) {
            pokemon.forms = pokemon.forms.filter(function (form) { return !form.isGigantamax; });
            return pokemon.forms.length > 0;
        }
        else {
            return true;
        }
    });
}
function toHtml(pokemon) {
    var includeSprites = spritesCheckbox.checked;
    return "<ol>".concat(pokemon.map(function (p) { return p.toHtml(includeSprites); }).join(""), "</ol>");
}
function submitFeedback(event) {
    return __awaiter(this, void 0, void 0, function () {
        var textArea, feedback, response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    textArea = document.getElementById('feedback-text');
                    feedback = textArea.value.trim();
                    if (!feedback) return [3, 7];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4, fetch('/api/feedback', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ text: feedback }),
                    })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) return [3, 4];
                    textArea.value = '';
                    alert('Thank you for your feedback!');
                    return [4, displayFeedback()];
                case 3:
                    _a.sent();
                    return [3, 5];
                case 4: throw new Error('Failed to submit feedback');
                case 5: return [3, 7];
                case 6:
                    error_2 = _a.sent();
                    console.error('Error submitting feedback:', error_2);
                    alert('An error occurred while submitting feedback. Please try again later.');
                    return [3, 7];
                case 7: return [2];
            }
        });
    });
}
function displayFeedback() {
    return __awaiter(this, void 0, void 0, function () {
        var response, feedbackList, feedbackItems, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4, fetch('/api/feedback')];
                case 1:
                    response = _a.sent();
                    if (!response.ok) return [3, 3];
                    return [4, response.json()];
                case 2:
                    feedbackList = _a.sent();
                    feedbackItems = document.getElementById('feedback-items');
                    feedbackItems.innerHTML = feedbackList.map(function (item) { return "\n        <div class=\"card\">\n          <p class=\"feedback-text\">".concat(item.text, "</p>\n          <small class=\"feedback-date\">").concat(new Date(item.date).toLocaleString(), "</small>\n        </div>\n      "); }).join('');
                    document.getElementById('feedback-list').style.display = 'block';
                    return [3, 4];
                case 3: throw new Error('获取反馈失败');
                case 4: return [3, 6];
                case 5:
                    error_3 = _a.sent();
                    console.error('获取反馈时出错:', error_3);
                    return [3, 6];
                case 6: return [2];
            }
        });
    });
}
function getRandomElement(arr) {
    return arr[randomInteger(arr.length)];
}
function removeRandomElement(arr) {
    return arr.splice(randomInteger(arr.length), 1)[0];
}
function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
        var j = randomInteger(i + 1);
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}
function randomInteger(maxExclusive) {
    return Math.floor(Math.random() * maxExclusive);
}
function markLoading(isLoading) {
    document.getElementById("controls").classList.toggle("loading", isLoading);
}
function setDropdownIfValid(select, value) {
    var option = select.querySelector("[value='" + value + "']");
    if (option) {
        select.value = option.value;
    }
}
function parseBoolean(boolean) {
    return boolean.toLowerCase() == "true";
}
function displayYearsInFooter() {
    document.querySelectorAll("span[data-since]").forEach(function (span) {
        span.innerText = span.dataset.since + "-" + new Date().getFullYear();
    });
}

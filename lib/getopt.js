// Generated by ToffeeScript 1.3.3
(function() {
  var Getopt,
    __matches = null;

  Getopt = (function() {

    Getopt.HAS_ARGUMENT = true;

    Getopt.NO_ARGUMENT = false;

    Getopt.MULTI_SUPPORTED = true;

    Getopt.SINGLE_ONLY = false;

    Getopt.prototype.save_option_ = function(options, option, argv) {
      var value, _name, _ref;
      if (option.has_argument) {
        if (argv.length === 0) {
          throw new Error("option " + option.long_name + " needs argument");
        }
        value = argv.shift();
      } else {
        value = true;
      }
      if (option.multi_supported) {
        if ((_ref = options[_name = option.name]) == null) {
          options[_name] = [];
        }
        options[option.name].push(value);
      } else {
        options[option.name] = value;
      }
      return this;
    };

    function Getopt(options) {
      var has_argument, long_name, multi_supported, name, option, short_name, _i, _len, _ref;
      this.options = options;
      this.short_options = {};
      this.long_options = {};
      _ref = this.options;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        option = _ref[_i];
        short_name = option[0], long_name = option[1], has_argument = option[2], multi_supported = option[3];
        if (long_name === '') {
          long_name = short_name;
        }
        has_argument = !!has_argument;
        multi_supported = !!multi_supported;
        name = long_name;
        this.long_options[long_name] = {
          name: name,
          short_name: short_name,
          long_name: long_name,
          has_argument: has_argument,
          multi_supported: multi_supported
        };
        if (short_name !== '') {
          this.short_options[short_name] = this.long_options[long_name];
        }
      }
      this;

    }

    Getopt.prototype.parse = function(argv) {
      var arg, i, long_name, option, rt_argv, rt_options, short_name, short_names, value, _i, _len;
      argv = argv.slice(0);
      rt_options = {};
      rt_argv = [];
      while ((arg = argv.shift()) != null) {
        if ((__matches = arg.match(/^-(\w+)/))) {
          short_names = __matches[1];
          for (i = _i = 0, _len = short_names.length; _i < _len; i = ++_i) {
            short_name = short_names[i];
            option = this.short_options[short_name];
            if (!option) {
              throw new Error("invalid option " + short_name);
            }
            if (option.has_argument) {
              if (i < short_names.length - 1) {
                argv.unshift(short_names.slice(i + 1));
              }
              this.save_option_(rt_options, option, argv);
              break;
            } else {
              this.save_option_(rt_options, option, argv);
            }
          }
        } else if ((__matches = arg.match(/^--(\w+)((?:=.*)?)$/))) {
          long_name = __matches[1];
          value = __matches[2];
          if (value !== '') {
            value = value.slice(1);
            argv.unshift(value);
          }
          option = this.long_options[long_name];
          if (!option) {
            throw new Error("invalid option " + long_name);
          }
          this.save_option_(rt_options, option, argv);
        } else if (arg === '--') {
          rt_argv = rt_argv.concat(argv);
          break;
        } else {
          rt_argv.push(arg);
        }
      }
      return {
        argv: rt_argv,
        options: rt_options
      };
    };

    return Getopt;

  })();

  module.exports = Getopt;

}).call(this);
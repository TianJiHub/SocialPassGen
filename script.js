// 社会工程学密码生成器核心逻辑

class SocialPassGen {
    constructor() {
        this.commonPatterns = [
            '{name}{year}', '{name}{special}{year}', '{name}{year}{special}',
            '{name}{day}', '{name}{special}{day}', '{name}{day}{special}',
            '{year}{name}', '{year}{special}{name}', '{special}{name}{year}',
            '{name}{name2}', '{name}{special}{name2}', '{name2}{special}{name}',
            '{phone}', '{qq}', '{wechat}', '{email}',
            '{name}@{domain}', '{name}_{domain}',
            '{idcard}', '{idcard_short}',
            '{other}{year}', '{other}{special}{year}',
            '{partner}{year}', '{partner}{special}{year}'
        ];
        
        this.specialChars = ['!', '@', '#', '$', '%', '&', '*', '.', '_', '-'];
        this.commonNumbers = ['123', '1234', '12345', '123456', '000', '666', '888', '999'];
        this.commonWords = ['admin', 'root', 'user', 'login', 'password', 'pwd', 'pass'];
    }
    
    // 收集表单数据
    collectFormData() {
        const caseOption = document.querySelector('input[name="caseOption"]:checked').value;
        
        return {
            chineseName: document.getElementById('chineseName').value.trim(),
            englishName: document.getElementById('englishName').value.trim(),
            solarBirthDate: document.getElementById('solarBirthDate').value,
            lunarBirthDate: document.getElementById('lunarBirthDate').value,
            idCard: document.getElementById('idCard').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            qq: document.getElementById('qq').value.trim(),
            wechat: document.getElementById('wechat').value.trim(),
            email: document.getElementById('email').value.trim(),
            commonPhrases: document.getElementById('commonPhrases').value.trim(),
            nicknames: document.getElementById('nicknames').value.trim(),
            accounts: document.getElementById('accounts').value.trim(),
            organizationChinese: document.getElementById('organizationChinese').value.trim(),
            organizationEnglish: document.getElementById('organizationEnglish').value.trim(),
            companyChinese: document.getElementById('companyChinese').value.trim(),
            companyEnglish: document.getElementById('companyEnglish').value.trim(),
            employeeId: document.getElementById('employeeId').value.trim(),
            sequences: document.getElementById('sequences').value.trim(),
            separators: document.getElementById('separators').value.trim(),
            partnerChineseName: document.getElementById('partnerChineseName').value.trim(),
            partnerEnglishName: document.getElementById('partnerEnglishName').value.trim(),
            partnerSolarBirthDate: document.getElementById('partnerSolarBirthDate').value,
            partnerLunarBirthDate: document.getElementById('partnerLunarBirthDate').value,
            otherInfo: document.getElementById('otherInfo').value.trim(),
            passwordLength: document.getElementById('passwordLength').value.trim(),
            caseOption: caseOption
        };
    }
    
    // 提取个人信息片段
    extractInfoPieces(info) {
        const pieces = new Set();
        
        // 处理中文姓名（拼音）
        if (info.chineseName) {
            const name = info.chineseName.trim();
            if (name) {
                // 根据用户选择添加不同格式
                if (info.caseOption === 'lower') {
                    pieces.add(name.toLowerCase());
                } else if (info.caseOption === 'upper') {
                    pieces.add(name.toUpperCase());
                } else if (info.caseOption === 'capitalize') {
                    pieces.add(name.charAt(0).toUpperCase() + name.slice(1).toLowerCase());
                } else {
                    // 默认添加所有格式
                    pieces.add(name.toLowerCase());
                    pieces.add(name.toUpperCase());
                    pieces.add(name.charAt(0).toUpperCase() + name.slice(1).toLowerCase());
                }
            }
        }
        
        // 处理英文姓名
        if (info.englishName) {
            const names = info.englishName.split(' ');
            names.forEach(name => {
                const trimmed = name.trim();
                if (trimmed) {
                    // 根据用户选择添加不同格式
                    if (info.caseOption === 'lower') {
                        pieces.add(trimmed.toLowerCase());
                    } else if (info.caseOption === 'upper') {
                        pieces.add(trimmed.toUpperCase());
                    } else if (info.caseOption === 'capitalize') {
                        pieces.add(trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase());
                    } else {
                        // 默认添加所有格式
                        pieces.add(trimmed.toLowerCase());
                        pieces.add(trimmed.toUpperCase());
                        pieces.add(trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase());
                    }
                }
            });
            
            // 组合多个英文名
            if (names.length > 1) {
                const trimmedNames = names.map(n => n.trim()).filter(n => n);
                const combined = trimmedNames.join('');
                const underscored = trimmedNames.join('_');
                const dotted = trimmedNames.join('.');
                
                // 根据用户选择添加不同格式
                if (info.lowercaseAll) {
                    pieces.add(combined.toLowerCase());
                    pieces.add(underscored.toLowerCase());
                    pieces.add(dotted.toLowerCase());
                } else if (info.uppercaseAll) {
                    pieces.add(combined.toUpperCase());
                    pieces.add(underscored.toUpperCase());
                    pieces.add(dotted.toUpperCase());
                } else if (info.capitalizeFirst) {
                    pieces.add(combined.charAt(0).toUpperCase() + combined.slice(1).toLowerCase());
                    pieces.add(underscored.charAt(0).toUpperCase() + underscored.slice(1).toLowerCase());
                    pieces.add(dotted.charAt(0).toUpperCase() + dotted.slice(1).toLowerCase());
                } else {
                    // 默认添加所有格式
                    pieces.add(combined.toLowerCase());
                    pieces.add(combined.toUpperCase());
                    pieces.add(combined.charAt(0).toUpperCase() + combined.slice(1).toLowerCase());
                    
                    pieces.add(underscored.toLowerCase());
                    pieces.add(underscored.toUpperCase());
                    pieces.add(underscored.charAt(0).toUpperCase() + underscored.slice(1).toLowerCase());
                    
                    pieces.add(dotted.toLowerCase());
                    pieces.add(dotted.toUpperCase());
                    pieces.add(dotted.charAt(0).toUpperCase() + dotted.slice(1).toLowerCase());
                }
            }
        }
        
        // 处理英文名
        if (info.englishName) {
            const names = info.englishName.split(' ');
            names.forEach(name => {
                if (name) {
                    pieces.add(name.toLowerCase());
                    pieces.add(name.toUpperCase());
                    pieces.add(name.charAt(0).toUpperCase() + name.slice(1).toLowerCase());
                }
            });
            
            // 组合多个英文名
            if (names.length > 1) {
                pieces.add(names.join(''));
                pieces.add(names.join('_'));
                pieces.add(names.join('.'));
            }
        }
        
        // 处理常用短语
        if (info.commonPhrases) {
            const phrases = info.commonPhrases.split(',');
            phrases.forEach(phrase => {
                const trimmed = phrase.trim();
                if (trimmed) {
                    // 根据用户选择添加不同格式
                    if (info.caseOption === 'lower') {
                        pieces.add(trimmed.toLowerCase());
                    } else if (info.caseOption === 'upper') {
                        pieces.add(trimmed.toUpperCase());
                    } else if (info.caseOption === 'capitalize') {
                        pieces.add(trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase());
                    } else {
                        // 默认添加所有格式
                        pieces.add(trimmed.toLowerCase());
                        pieces.add(trimmed.toUpperCase());
                        pieces.add(trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase());
                    }
                }
            });
        }
        
        // 处理网络昵称
        if (info.nicknames) {
            const nicknames = info.nicknames.split(',');
            nicknames.forEach(nickname => {
                const trimmed = nickname.trim();
                if (trimmed) {
                    // 根据用户选择添加不同格式
                    if (info.lowercaseAll) {
                        pieces.add(trimmed.toLowerCase());
                    } else if (info.uppercaseAll) {
                        pieces.add(trimmed.toUpperCase());
                    } else if (info.capitalizeFirst) {
                        pieces.add(trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase());
                    } else {
                        // 默认添加所有格式
                        pieces.add(trimmed.toLowerCase());
                        pieces.add(trimmed.toUpperCase());
                        pieces.add(trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase());
                    }
                }
            });
        }
        
        // 处理网络帐号
        if (info.accounts) {
            const accounts = info.accounts.split(',');
            accounts.forEach(account => {
                const trimmed = account.trim();
                if (trimmed) {
                    pieces.add(trimmed);
                }
            });
        }
        
        // 处理组织名（中文拼音）
        if (info.organizationChinese) {
            const org = info.organizationChinese.trim();
            if (org) {
                // 根据用户选择添加不同格式
                if (info.lowercaseAll) {
                    pieces.add(org.toLowerCase());
                } else if (info.uppercaseAll) {
                    pieces.add(org.toUpperCase());
                } else if (info.capitalizeFirst) {
                    pieces.add(org.charAt(0).toUpperCase() + org.slice(1).toLowerCase());
                } else {
                    // 默认添加所有格式
                    pieces.add(org.toLowerCase());
                    pieces.add(org.toUpperCase());
                    pieces.add(org.charAt(0).toUpperCase() + org.slice(1).toLowerCase());
                }
            }
        }
        
        // 处理组织名（英文）
        if (info.organizationEnglish) {
            const org = info.organizationEnglish.trim();
            if (org) {
                // 根据用户选择添加不同格式
                if (info.lowercaseAll) {
                    pieces.add(org.toLowerCase());
                } else if (info.uppercaseAll) {
                    pieces.add(org.toUpperCase());
                } else if (info.capitalizeFirst) {
                    pieces.add(org.charAt(0).toUpperCase() + org.slice(1).toLowerCase());
                } else {
                    // 默认添加所有格式
                    pieces.add(org.toLowerCase());
                    pieces.add(org.toUpperCase());
                    pieces.add(org.charAt(0).toUpperCase() + org.slice(1).toLowerCase());
                }
            }
        }
        
        // 处理公司名（中文拼音）
        if (info.companyChinese) {
            const company = info.companyChinese.trim();
            if (company) {
                // 根据用户选择添加不同格式
                if (info.lowercaseAll) {
                    pieces.add(company.toLowerCase());
                } else if (info.uppercaseAll) {
                    pieces.add(company.toUpperCase());
                } else if (info.capitalizeFirst) {
                    pieces.add(company.charAt(0).toUpperCase() + company.slice(1).toLowerCase());
                } else {
                    // 默认添加所有格式
                    pieces.add(company.toLowerCase());
                    pieces.add(company.toUpperCase());
                    pieces.add(company.charAt(0).toUpperCase() + company.slice(1).toLowerCase());
                }
            }
        }
        
        // 处理公司名（英文）
        if (info.companyEnglish) {
            const company = info.companyEnglish.trim();
            if (company) {
                // 根据用户选择添加不同格式
                if (info.lowercaseAll) {
                    pieces.add(company.toLowerCase());
                } else if (info.uppercaseAll) {
                    pieces.add(company.toUpperCase());
                } else if (info.capitalizeFirst) {
                    pieces.add(company.charAt(0).toUpperCase() + company.slice(1).toLowerCase());
                } else {
                    // 默认添加所有格式
                    pieces.add(company.toLowerCase());
                    pieces.add(company.toUpperCase());
                    pieces.add(company.charAt(0).toUpperCase() + company.slice(1).toLowerCase());
                }
            }
        }
        
        // 处理工号
        if (info.employeeId) {
            pieces.add(info.employeeId.trim());
        }
        
        // 处理常用序列
        if (info.sequences) {
            const sequences = info.sequences.split(',');
            sequences.forEach(sequence => {
                const trimmed = sequence.trim();
                if (trimmed) {
                    pieces.add(trimmed);
                }
            });
        }
        
        // 处理连接符
        if (info.separators) {
            const separators = info.separators.split(',');
            separators.forEach(separator => {
                const trimmed = separator.trim();
                if (trimmed) {
                    pieces.add(trimmed);
                }
            });
        }
        
        // 处理农历生日
        if (info.solarBirthDate) {
            const date = new Date(info.solarBirthDate);
            const year = date.getFullYear().toString();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            
            pieces.add(year);  // 1990
            pieces.add(year.slice(2));  // 90
            pieces.add(month);  // 01
            pieces.add(day);   // 01
            pieces.add(month + day);  // 0101
            pieces.add(year + month + day);  // 19900101
            pieces.add(year.slice(2) + month + day);  // 900101
        }
        
        // 处理阴历生日
        if (info.lunarBirthDate) {
            const date = new Date(info.lunarBirthDate);
            const year = date.getFullYear().toString();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            
            pieces.add(year);  // 1990
            pieces.add(year.slice(2));  // 90
            pieces.add(month);  // 01
            pieces.add(day);   // 01
            pieces.add(month + day);  // 0101
            pieces.add(year + month + day);  // 19900101
            pieces.add(year.slice(2) + month + day);  // 900101
        }
        
        // 处理身份证
        if (info.idCard) {
            pieces.add(info.idCard);
            if (info.idCard.length >= 6) {
                pieces.add(info.idCard.slice(-6));  // 后6位
            }
            if (info.idCard.length >= 4) {
                pieces.add(info.idCard.slice(-4));  // 后4位
            }
        }
        
        // 处理手机号
        if (info.phone) {
            pieces.add(info.phone);
            if (info.phone.length >= 6) {
                pieces.add(info.phone.slice(-6));  // 后6位
            }
            if (info.phone.length >= 4) {
                pieces.add(info.phone.slice(-4));  // 后4位
            }
        }
        
        // 处理QQ号
        if (info.qq) {
            pieces.add(info.qq);
        }
        
        // 处理微信号
        if (info.wechat) {
            pieces.add(info.wechat);
        }
        
        // 处理邮箱
        if (info.email) {
            pieces.add(info.email);
            const emailParts = info.email.split('@');
            if (emailParts.length > 1) {
                pieces.add(emailParts[0]);  // @前部分
                pieces.add(emailParts[1]);  // @后部分
            }
        }
        
        // 处理域名/常用ID
        if (info.domain) {
            pieces.add(info.domain);
        }
        
        // 处理伴侣中文拼音姓名
        if (info.partnerChineseName) {
            const name = info.partnerChineseName.trim();
            if (name) {
                // 根据用户选择添加不同格式
                if (info.caseOption === 'lower') {
                    pieces.add(name.toLowerCase());
                } else if (info.caseOption === 'upper') {
                    pieces.add(name.toUpperCase());
                } else if (info.caseOption === 'capitalize') {
                    pieces.add(name.charAt(0).toUpperCase() + name.slice(1).toLowerCase());
                } else {
                    // 默认添加所有格式
                    pieces.add(name.toLowerCase());
                    pieces.add(name.toUpperCase());
                    pieces.add(name.charAt(0).toUpperCase() + name.slice(1).toLowerCase());
                }
            }
        }
        
        // 处理伴侣英文姓名
        if (info.partnerEnglishName) {
            const names = info.partnerEnglishName.split(' ');
            names.forEach(name => {
                const trimmed = name.trim();
                if (trimmed) {
                    // 根据用户选择添加不同格式
                    if (info.lowercaseAll) {
                        pieces.add(trimmed.toLowerCase());
                    } else if (info.uppercaseAll) {
                        pieces.add(trimmed.toUpperCase());
                    } else if (info.capitalizeFirst) {
                        pieces.add(trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase());
                    } else {
                        // 默认添加所有格式
                        pieces.add(trimmed.toLowerCase());
                        pieces.add(trimmed.toUpperCase());
                        pieces.add(trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase());
                    }
                }
            });
            
            // 组合多个英文名
            if (names.length > 1) {
                const trimmedNames = names.map(n => n.trim()).filter(n => n);
                const combined = trimmedNames.join('');
                const underscored = trimmedNames.join('_');
                const dotted = trimmedNames.join('.');
                
                // 根据用户选择添加不同格式
                if (info.lowercaseAll) {
                    pieces.add(combined.toLowerCase());
                    pieces.add(underscored.toLowerCase());
                    pieces.add(dotted.toLowerCase());
                } else if (info.uppercaseAll) {
                    pieces.add(combined.toUpperCase());
                    pieces.add(underscored.toUpperCase());
                    pieces.add(dotted.toUpperCase());
                } else if (info.capitalizeFirst) {
                    pieces.add(combined.charAt(0).toUpperCase() + combined.slice(1).toLowerCase());
                    pieces.add(underscored.charAt(0).toUpperCase() + underscored.slice(1).toLowerCase());
                    pieces.add(dotted.charAt(0).toUpperCase() + dotted.slice(1).toLowerCase());
                } else {
                    // 默认添加所有格式
                    pieces.add(combined.toLowerCase());
                    pieces.add(combined.toUpperCase());
                    pieces.add(combined.charAt(0).toUpperCase() + combined.slice(1).toLowerCase());
                    
                    pieces.add(underscored.toLowerCase());
                    pieces.add(underscored.toUpperCase());
                    pieces.add(underscored.charAt(0).toUpperCase() + underscored.slice(1).toLowerCase());
                    
                    pieces.add(dotted.toLowerCase());
                    pieces.add(dotted.toUpperCase());
                    pieces.add(dotted.charAt(0).toUpperCase() + dotted.slice(1).toLowerCase());
                }
            }
        }
        
        // 处理伴侣农历生日
        if (info.partnerSolarBirthDate) {
            const date = new Date(info.partnerSolarBirthDate);
            const year = date.getFullYear().toString();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            
            pieces.add(year);  // 1990
            pieces.add(year.slice(2));  // 90
            pieces.add(month);  // 01
            pieces.add(day);   // 01
            pieces.add(month + day);  // 0101
            pieces.add(year + month + day);  // 19900101
            pieces.add(year.slice(2) + month + day);  // 900101
        }
        
        // 处理伴侣阴历生日
        if (info.partnerLunarBirthDate) {
            const date = new Date(info.partnerLunarBirthDate);
            const year = date.getFullYear().toString();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            
            pieces.add(year);  // 1990
            pieces.add(year.slice(2));  // 90
            pieces.add(month);  // 01
            pieces.add(day);   // 01
            pieces.add(month + day);  // 0101
            pieces.add(year + month + day);  // 19900101
            pieces.add(year.slice(2) + month + day);  // 900101
        }
        
        // 处理其他信息
        if (info.otherInfo) {
            const otherParts = info.otherInfo.split(',');
            otherParts.forEach(part => {
                const trimmed = part.trim();
                if (trimmed) {
                    // 根据用户选择添加不同格式
                    if (info.lowercaseAll) {
                        pieces.add(trimmed.toLowerCase());
                    } else if (info.uppercaseAll) {
                        pieces.add(trimmed.toUpperCase());
                    } else if (info.capitalizeFirst) {
                        pieces.add(trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase());
                    } else {
                        // 默认添加所有格式
                        pieces.add(trimmed.toLowerCase());
                        pieces.add(trimmed.toUpperCase());
                        pieces.add(trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase());
                    }
                }
            });
        }
        
        return Array.from(pieces);
    }
    
    // 生成密码组合
    generatePasswords(infoPieces, info) {
        const passwords = new Set();
        
        // 获取连接符
        let separators = ['']; // 默认为空
        if (info.separators) {
            separators = info.separators.split(',').map(s => s.trim()).filter(s => s);
            if (separators.length === 0) separators = [''];
        }
        
        // 添加常用模式生成的密码
        this.commonPatterns.forEach(pattern => {
            infoPieces.forEach(piece1 => {
                infoPieces.forEach(piece2 => {
                    if (piece1 !== piece2) {
                        // 替换模式中的占位符
                        let password = pattern
                            .replace(/{name}/g, piece1)
                            .replace(/{name2}/g, piece2)
                            .replace(/{year}/g, infoPieces.find(p => /^\d{4}$/.test(p)) || '1990')
                            .replace(/{day}/g, infoPieces.find(p => /^\d{2,4}$/.test(p)) || '01')
                            .replace(/{phone}/g, infoPieces.find(p => /^\d{7,}$/.test(p)) || '')
                            .replace(/{qq}/g, infoPieces.find(p => /^\d{5,}$/.test(p)) || '')
                            .replace(/{wechat}/g, infoPieces.find(p => p.length > 0) || '')
                            .replace(/{email}/g, infoPieces.find(p => p.includes('@')) || '')
                            .replace(/{domain}/g, infoPieces.find(p => p.includes('.')) || '')
                            .replace(/{idcard}/g, infoPieces.find(p => /^\d{17,}$/.test(p)) || '')
                            .replace(/{idcard_short}/g, infoPieces.find(p => /^\d{4,6}$/.test(p)) || '')
                            .replace(/{other}/g, piece1)
                            .replace(/{partner}/g, piece2);
                        
                        // 添加特殊字符
                        this.specialChars.forEach(char => {
                            const withSpecial = pattern.includes('{special}') ? 
                                password.replace(/{special}/g, char) : password;
                            if (withSpecial && withSpecial.length >= 4) {
                                passwords.add(withSpecial);
                            }
                        });
                        
                        // 不加特殊字符的版本
                        if (password && password.length >= 4) {
                            passwords.add(password);
                        }
                        
                        // 使用连接符组合多个信息片段
                        separators.forEach(separator => {
                            if (separator) {
                                const combined1 = piece1 + separator + piece2;
                                const combined2 = piece2 + separator + piece1;
                                
                                if (combined1.length >= 4) {
                                    passwords.add(combined1);
                                }
                                
                                if (combined2.length >= 4) {
                                    passwords.add(combined2);
                                }
                            }
                        });
                    }
                });
            });
        });
        
        // 添加常见数字组合
        infoPieces.forEach(piece => {
            this.commonNumbers.forEach(num => {
                passwords.add(piece + num);
                passwords.add(num + piece);
            });
        });
        
        // 添加常见单词组合
        infoPieces.forEach(piece => {
            this.commonWords.forEach(word => {
                passwords.add(piece + word);
                passwords.add(word + piece);
                this.specialChars.forEach(char => {
                    passwords.add(piece + char + word);
                    passwords.add(word + char + piece);
                });
            });
        });
        
        // 添加信息片段直接作为密码
        infoPieces.forEach(piece => {
            if (piece.length >= 4 && piece.length <= 20) {
                passwords.add(piece);
            }
        });
        
        // 生成键盘模式密码 (简化版)
        const keyboardPatterns = ['qwerty', 'asdf', 'zxcv', '1234'];
        infoPieces.forEach(piece => {
            keyboardPatterns.forEach(pattern => {
                passwords.add(piece + pattern);
                passwords.add(pattern + piece);
            });
        });
        
        return Array.from(passwords).filter(pwd => pwd.length >= 4 && pwd.length <= 30);
    }
    
    // 生成密码本
    generatePasswordList() {
        const info = this.collectFormData();
        const infoPieces = this.extractInfoPieces(info);
        const passwords = this.generatePasswords(infoPieces, info);
        
        // 处理密码长度限制
        let minLength = 4;
        let maxLength = 30;
        
        if (info.passwordLength) {
            const lengthSetting = info.passwordLength.trim();
            
            // 处理范围格式 (如: 8-16)
            if (lengthSetting.includes('-')) {
                const parts = lengthSetting.split('-');
                if (parts.length === 2) {
                    const min = parseInt(parts[0].trim());
                    const max = parseInt(parts[1].trim());
                    if (!isNaN(min) && !isNaN(max) && min <= max) {
                        minLength = min;
                        maxLength = max;
                    }
                }
            } 
            // 处理固定长度格式 (如: 12)
            else {
                const length = parseInt(lengthSetting);
                if (!isNaN(length)) {
                    minLength = length;
                    maxLength = length;
                }
            }
        }
        
        // 过滤符合长度要求的密码
        const lengthFilteredPasswords = passwords.filter(pwd => 
            pwd.length >= minLength && pwd.length <= maxLength
        );
        
        // 去重并限制数量
        const uniquePasswords = [...new Set(lengthFilteredPasswords)];
        return uniquePasswords.slice(0, 5000); // 限制最多5000个密码
    }
}

// 导出为TXT
function exportToTxt(passwords) {
    const content = passwords.join('\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'passwords.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// 导出为CSV
function exportToCsv(passwords) {
    const header = 'Password\n';
    const content = header + passwords.map(pwd => `"${pwd.replace(/"/g, '"')}"`).join('\n');
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'passwords.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// 导出为JSON
function exportToJson(passwords) {
    const data = { passwords: passwords };
    const content = JSON.stringify(data, null, 2);
    const blob = new Blob([content], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'passwords.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// 导出为Excel (实际为CSV格式，但文件扩展名为xlsx以兼容Excel)
function exportToExcel(passwords) {
    const header = 'Password\n';
    const content = header + passwords.map(pwd => `"${pwd.replace(/"/g, '"')}"`).join('\n');
    const blob = new Blob([content], { type: 'application/vnd.ms-excel;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'passwords.xlsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// 显示加载状态
function showLoading() {
    const btn = document.getElementById('generateBtn');
    btn.classList.add('generating');
    btn.disabled = true;
    btn.textContent = '生成中...';
}

// 隐藏加载状态
function hideLoading() {
    const btn = document.getElementById('generateBtn');
    btn.classList.remove('generating');
    btn.disabled = false;
    btn.textContent = '生成密码本';
}

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    const generator = new SocialPassGen();
    
    // 生成密码按钮事件
    document.getElementById('generateBtn').addEventListener('click', function() {
        showLoading();
        
        // 使用setTimeout让UI更新
        setTimeout(() => {
            try {
                const passwords = generator.generatePasswordList();
                
                if (passwords.length === 0) {
                    alert('请至少填写一些信息以生成密码！');
                    hideLoading();
                    return;
                }
                
                // 显示结果
                document.getElementById('passwordCount').textContent = passwords.length;
                const passwordList = document.getElementById('passwordList');
                passwordList.innerHTML = '';
                
                passwords.forEach(password => {
                    const li = document.createElement('li');
                    li.textContent = password;
                    passwordList.appendChild(li);
                });
                
                // 显示结果区域
                document.getElementById('result').classList.remove('hidden');
                
                // 导出按钮事件
                window.generatedPasswords = passwords;
            } catch (error) {
                console.error('生成密码时出错:', error);
                alert('生成密码时出现错误，请检查输入信息。');
            } finally {
                hideLoading();
            }
        }, 100);
    });
    
    // 导出按钮事件
    document.getElementById('exportTxt').addEventListener('click', function() {
        if (window.generatedPasswords) {
            exportToTxt(window.generatedPasswords);
        }
    });
    
    document.getElementById('exportCsv').addEventListener('click', function() {
        if (window.generatedPasswords) {
            exportToCsv(window.generatedPasswords);
        }
    });
    
    document.getElementById('exportJson').addEventListener('click', function() {
        if (window.generatedPasswords) {
            exportToJson(window.generatedPasswords);
        }
    });
    
    document.getElementById('exportExcel').addEventListener('click', function() {
        if (window.generatedPasswords) {
            exportToExcel(window.generatedPasswords);
        }
    });
});